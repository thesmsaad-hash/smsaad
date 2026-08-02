import { createPublicClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Consistent shape returned by every repository method */
export interface RepositoryResult<T> {
  data: T | null;
  error: string | null;
  count?: number;
}

/** Pagination options supported by every repository */
export interface PaginationOptions {
  page?: number;
  limit?: number;
}

/**
 * BaseRepository
 *
 * All domain repositories extend this class. It centralises:
 *  - Supabase client creation
 *  - Error normalisation → {data, error, count}
 *  - Pagination helpers
 *  - Caching constants
 */
export abstract class BaseRepository {
  /** Override in each repository */
  protected abstract readonly cacheTag: string;
  protected abstract readonly revalidate: number;

  // --------------------------------------------------------------------------
  // Client
  // --------------------------------------------------------------------------

  protected async getClient(): Promise<SupabaseClient> {
    return createPublicClient();
  }

  // --------------------------------------------------------------------------
  // Pagination
  // --------------------------------------------------------------------------

  /** Convert page + limit into a Supabase range tuple [from, to] */
  protected getRange(page: number = 1, limit: number = 10): [number, number] {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return [from, to];
  }

  // --------------------------------------------------------------------------
  // Error normalisation
  // --------------------------------------------------------------------------

  protected ok<T>(data: T, count?: number): RepositoryResult<T> {
    return { data, error: null, count };
  }

  protected fail<T>(error: unknown): RepositoryResult<T> {
    let message = "Unknown repository error";
    if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object") {
      if ("message" in error && typeof (error as { message?: string }).message === "string") {
        message = (error as { message: string }).message;
      } else {
        try {
          message = JSON.stringify(error);
        } catch {
          message = String(error);
        }
      }
    }
    console.error(`[${this.cacheTag}]`, message, error);
    return { data: null, error: message };
  }
}
