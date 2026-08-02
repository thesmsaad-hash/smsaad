-- ==============================================================================
-- SMSAAD Platform 2.0 — Seed Data
-- Run AFTER migrations 00001 and 00002.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CATEGORIES
-- ------------------------------------------------------------------------------
insert into categories (id, slug, title, description, icon_name)
values
  ('c0000000-0000-0000-0000-000000000001',   'artificial-intelligence', 'Artificial Intelligence',
   'Neural network architectures, transformer models, latent diffusion, and deep learning foundations.',
   'BrainCircuit'),
  ('c0000000-0000-0000-0000-000000000002',  'visual-effects', 'Visual Effects (VFX)',
   '3D Gaussian Splatting, NeRFs, AI rotoscoping, depth extraction, camera tracking, and compositing.',
   'Sparkles'),
  ('c0000000-0000-0000-0000-000000000003', 'filmmaking', 'Filmmaking',
   'Cinematography principles, virtual production, LED volume workflows, shot composition.',
   'Clapperboard'),
  ('c0000000-0000-0000-0000-000000000004',   'creative-technology', 'Creative Technology',
   'ComfyUI node workflows, TouchDesigner integration, custom Python scripts, real-time engines.',
   'Cpu'),
  ('c0000000-0000-0000-0000-000000000005',   'prompt-engineering', 'Prompt Engineering',
   'Token attention, cross-attention control, negative conditioning, aesthetic keywords.',
   'Terminal'),
  ('c0000000-0000-0000-0000-000000000006','video-generation', 'Video Generation',
   'Runway, Sora, Luma, AnimateDiff and temporal consistency control in generative video.',
   'Video'),
  ('c0000000-0000-0000-0000-000000000007', 'editing', 'Editing & Post',
   'AI-assisted pacing, color grading math, optical flow interpolation, dynamic audio syncing.',
   'Scissors'),
  ('c0000000-0000-0000-0000-000000000008','audio', 'Audio & Voice AI',
   'ElevenLabs voice cloning, SFX synthesis, neural music generation, binaural spatial audio.',
   'Mic')
on conflict (slug) do nothing;

-- ------------------------------------------------------------------------------
-- 2. TAGS
-- ------------------------------------------------------------------------------
insert into tags (id, name, slug)
values
  ('b0000000-0000-0000-0000-000000000001',   'Diffusion Models',         'diffusion-models'),
  ('b0000000-0000-0000-0000-000000000002',  'LoRA',                     'lora'),
  ('b0000000-0000-0000-0000-000000000003', 'ComfyUI',                  'comfyui'),
  ('b0000000-0000-0000-0000-000000000004','3D Gaussian Splatting',    '3d-gaussian-splatting'),
  ('b0000000-0000-0000-0000-000000000005',  'NeRF',                     'nerf'),
  ('b0000000-0000-0000-0000-000000000006',   'CFG',                      'cfg'),
  ('b0000000-0000-0000-0000-000000000007',   'VAE',                      'vae'),
  ('b0000000-0000-0000-0000-000000000008',  'ControlNet',               'controlnet'),
  ('b0000000-0000-0000-0000-000000000009','Runway',                   'runway'),
  ('b0000000-0000-0000-0000-000000000010',  'Flux',                     'flux'),
  ('b0000000-0000-0000-0000-000000000011',  'ACES Color',               'aces-color'),
  ('b0000000-0000-0000-0000-000000000012',  'U-Net',                    'u-net'),
  ('b0000000-0000-0000-0000-000000000013',    'Prompt Engineering',       'prompt-engineering'),
  ('b0000000-0000-0000-0000-000000000014','Camera Tracking',          'camera-tracking'),
  ('b0000000-0000-0000-0000-000000000015','IP-Adapter',               'ip-adapter')
on conflict (slug) do nothing;

-- ------------------------------------------------------------------------------
-- 3. KNOWLEDGE ARTICLES  (content.type = 'knowledge')
-- ------------------------------------------------------------------------------
insert into content (id, type, status, slug, title, description, body, cover_image, reading_time, difficulty, category_id, published_at)
values
  (
    'a0000000-0000-0000-0000-000000000001',
    'knowledge',
    'Published',
    'understanding-latent-diffusion-models',
    'Understanding Latent Diffusion Models (LDM) in AI Video & Imagery',
    'A first-principles dive into how latent diffusion operates: compressing pixel space into latent space, forward noise degradation, and reverse denoising with cross-attention.',
    '## Pixel Space vs. Latent Space Compression

Standard pixel space diffusion operates directly on high-resolution image matrices (e.g., 1920 × 1080 × 3). This incurs immense computational costs.

LDMs solve this efficiency bottleneck by using a Variational Autoencoder (VAE). The encoder E maps an image to a compressed latent representation z, where z ∈ R(h × w × c).

For standard SDXL and SVD implementations:
- Downsampling factor f = H / h = 8.
- A 1024 × 1024 × 3 image is compressed into a 128 × 128 × 4 latent tensor.

## The Forward Diffusion Process

Forward diffusion incrementally adds Gaussian noise to the latent vector z₀ over time steps t ∈ {1, …, T} according to a predefined noise schedule β₁, …, βT.

## U-Net Architecture & Cross-Attention Conditioning

The reverse process trains a parameter-conditioned U-Net to predict the exact noise injected at each step t, guided by textual or visual prompt embeddings τ.

The attention mechanism: Attention(Q, K, V) = softmax(QKᵀ / √dk) · V

## Adding Temporal Dimension for AI Video

To extend 2D diffusion into video:
1. Temporal Self-Attention: Each frame attends to preceding and succeeding frames.
2. Motion Vectors & Optical Flow Guidance: Injecting velocity maps into temporal attention blocks.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    '12 min read',
    'Advanced',
    'c0000000-0000-0000-0000-000000000001',
    now() - interval '30 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'knowledge',
    'Published',
    '3d-gaussian-splatting-vs-nerfs',
    '3D Gaussian Splatting vs. NeRFs in Modern VFX & Virtual Production',
    'Comparing Neural Radiance Fields (NeRF) and 3D Gaussian Splatting (3DGS) for real-time camera tracking, environment scanning, and LED volume background rendering.',
    '## Introduction to Volumetric Scene Capture

Volumetric capture has evolved from slow ray-marched Neural Radiance Fields to high-fps rasterized 3D Gaussian Splatting.

## Neural Radiance Fields (NeRF) Mathematical Model

A NeRF represents a continuous scene as a 5D vector function: spatial location (x, y, z) and viewing direction (θ, φ). The output is emitted color (r, g, b) and volume density σ.

## 3D Gaussian Splatting: Explicit Anisotropic Gaussians

Unlike NeRFs which require hundreds of neural evaluation queries per ray, 3DGS replaces MLPs with millions of 3D Gaussians defined by covariance matrix Σ and center position μ.

## Performance Benchmark

| Parameter | NeRF (Instant-NGP) | 3DGS |
|---|---|---|
| Representation | Implicit MLP | Explicit Point Cloud |
| Train Time | 5–15 min | 10–25 min |
| Render FPS (4K) | 15–30 FPS | 120–240 FPS |
| Editing Ability | Difficult | Easy |',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    '15 min read',
    'Expert',
    'c0000000-0000-0000-0000-000000000002',
    now() - interval '25 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'knowledge',
    'Published',
    'comfyui-advanced-workflow-architecture',
    'ComfyUI Advanced Workflow Architecture for Production AI Video',
    'Designing deterministic, modular node pipelines in ComfyUI using AnimateDiff, IP-Adapter identity preservation, and ControlNet depth maps.',
    '## The Directed Acyclic Graph (DAG) Execution Model

ComfyUI treats diffusion generation as a Directed Acyclic Graph (DAG), enabling precise execution order and memory caching across video generation nodes.

Unlike web UIs that lock parameters in rigid forms, ComfyUI evaluates node dependencies lazily:
- MODEL: Passed directly into Sampler nodes without redundant reload.
- CLIP: Encodes positive and negative prompt text into hidden state tensors.
- LATENT: Carries spatial/temporal dimensions through noise injection.

## Character Consistency with IP-Adapter

IP-Adapter projects reference image feature vectors into the cross-attention layers of the diffusion model, enabling consistent identity preservation across generated frames.

## Depth Map Temporal Stabilization

ControlNet depth maps provide structural guidance that prevents temporal jitter in AnimateDiff video sequences.',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    '10 min read',
    'Intermediate',
    'c0000000-0000-0000-0000-000000000004',
    now() - interval '20 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000004',
    'knowledge',
    'Published',
    'lora-fine-tuning-guide',
    'LoRA Fine-Tuning: Low-Rank Adaptation for Custom AI Models',
    'A practical guide to training LoRA adapters for character consistency, style transfer, and custom subject injection in Stable Diffusion and Flux models.',
    '## What is LoRA?

Low-Rank Adaptation (LoRA) injects trainable rank-decomposition matrices into the attention layers of a pre-trained model, dramatically reducing the number of trainable parameters.

Instead of fine-tuning all model weights (billions of parameters), LoRA trains only the rank-r decomposition matrices A and B where r << full rank.

## Training Pipeline

1. Collect 20–50 high-quality reference images of your subject.
2. Caption each image with detailed descriptive text.
3. Configure rank (r=16–64), alpha, and learning rate (1e-4 to 5e-5).
4. Train for 500–2000 steps depending on subject complexity.

## Injection Strength

LoRA weight is controlled by the multiplier applied at inference:
- 0.5–0.7: Subtle style influence.
- 0.8–1.0: Strong identity lock.
- >1.2: Risk of over-saturation and artifacts.',
    'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80',
    '8 min read',
    'Intermediate',
    'c0000000-0000-0000-0000-000000000001',
    now() - interval '15 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000005',
    'knowledge',
    'Published',
    'prompt-engineering-cinematography',
    'Prompt Engineering for Cinematic AI Video Generation',
    'Master the syntax, token structures, and semantic control mechanisms to produce consistent, high-fidelity cinematic results from text-to-video models.',
    '## Token Weight & Attention Control

In CLIP-based models, token position influences cross-attention weight. Front-loaded tokens receive higher attention scores.

Correct prompt structure: [Subject] + [Action] + [Environment] + [Camera] + [Lighting] + [Style]

## Camera Language Tokens

Use precise cinematography terminology:
- Shot types: extreme close-up, medium shot, wide establishing shot, aerial tracking shot.
- Lens terms: 85mm portrait lens, 18mm wide angle, 135mm telephoto compression.
- Movement: dolly zoom, rack focus, handheld verité, steadicam glide.

## Kelvin Color Temperature

Specifying exact Kelvin values dramatically improves color consistency:
- 2200K: Candlelight / golden hour.
- 3200K: Tungsten studio warmth.
- 5600K: Daylight / HMI neutral.
- 7500K: Cool overcast / deep shadow.',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    '9 min read',
    'Intermediate',
    'c0000000-0000-0000-0000-000000000005',
    now() - interval '10 days'
  )
on conflict (slug) do nothing;

-- content_tags join table
insert into content_tags (content_id, tag_id)
values
  ('a0000000-0000-0000-0000-000000000001',    'b0000000-0000-0000-0000-000000000001'),
  ('a0000000-0000-0000-0000-000000000001',    'b0000000-0000-0000-0000-000000000007'),
  ('a0000000-0000-0000-0000-000000000001',    'b0000000-0000-0000-0000-000000000012'),
  ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004'),
  ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000005'),
  ('a0000000-0000-0000-0000-000000000003',  'b0000000-0000-0000-0000-000000000003'),
  ('a0000000-0000-0000-0000-000000000003',  'b0000000-0000-0000-0000-000000000008'),
  ('a0000000-0000-0000-0000-000000000003',  'b0000000-0000-0000-0000-000000000015'),
  ('a0000000-0000-0000-0000-000000000004',   'b0000000-0000-0000-0000-000000000002'),
  ('a0000000-0000-0000-0000-000000000004',   'b0000000-0000-0000-0000-000000000001'),
  ('a0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000013'),
  ('a0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000014')
on conflict do nothing;

-- ------------------------------------------------------------------------------
-- 4. TOOLS
-- ------------------------------------------------------------------------------
insert into tools (id, slug, name, tagline, category, pricing_model, starting_price, pricing_details, rating, rating_count, best_for, strengths, weaknesses, is_featured)
values
  (
    'e0000000-0000-0000-0000-000000000001',
    'runway-gen-3-alpha',
    'Runway Gen-3 Alpha',
    'State-of-the-art multimodal generative video model built for filmmakers.',
    'Video Generation',
    'Paid',
    '$12 / month',
    'Standard tier includes 625 credits/month. Unlimited plan at $76/month.',
    '4.9',
    '1,240',
    'Cinematic camera movement, high fidelity video generation, and structural motion control.',
    '["Unmatched camera movement precision (pan, tilt, zoom, pedestal)","Motion Brush for localized velocity direction","High photorealism with 4K upscaling","Strong keyframe image-to-video alignment"]',
    '["Credit-based pricing can be expensive for long iterations","Fast human hand/finger motion still experiences temporal artifacts"]',
    true
  ),
  (
    'e0000000-0000-0000-0000-000000000002',
    'luma-dream-machine',
    'Luma Dream Machine',
    'High-speed, hyper-realistic video generation model with physical simulation dynamics.',
    'Video Generation',
    'Freemium',
    '$29.99 / month',
    'Free plan: 30 generations/month. Paid tiers offer priority queues.',
    '4.8',
    '890',
    'Complex physics simulation, fluid dynamics, explosion VFX, and fast shot turnarounds.',
    '["Rapid render generation speeds (~120 seconds)","Exceptional understanding of physical momentum","Free tier available for testing"]',
    '["Slightly lower text prompt adherence on intricate camera instructions compared to Runway"]',
    true
  ),
  (
    'e0000000-0000-0000-0000-000000000003',
    'comfyui-node-engine',
    'ComfyUI Node Engine',
    'Modular graph-based GPU diffusion pipeline framework with infinite extensibility.',
    'Image Generation',
    'Open Source',
    'Free',
    'Fully open source. GPU hardware required.',
    '5.0',
    '1,420',
    'Advanced AI filmmakers, node architects, and technical pipeline engineers.',
    '["Infinite Node Customization","Sub-100ms Execution","Custom Python Extensions","Full VRAM Control"]',
    '["Steep learning curve for beginners","No native video timeline editor"]',
    true
  ),
  (
    'e0000000-0000-0000-0000-000000000004',
    'flux-1-pro',
    'Flux 1.1 Pro',
    'Next-generation text-to-image model with superior prompt adherence and photorealism.',
    'Image Generation',
    'Paid',
    '$0.04 / image',
    'API pricing at $0.04 per image generation via Replicate or Black Forest Labs.',
    '4.9',
    '640',
    'Commercial concept art, product visualization, and character design.',
    '["Industry-leading prompt adherence","Exceptional anatomy and hands rendering","Superior photorealism vs SD3","Fast generation at ~8 seconds"]',
    '["No native video generation","Requires API access for full resolution"]',
    true
  ),
  (
    'e0000000-0000-0000-0000-000000000005',
    'kling-ai',
    'Kling AI',
    'Chinese-developed AI video model with strong temporal consistency and realistic motion.',
    'Video Generation',
    'Freemium',
    '$7 / month',
    'Free tier available with watermark. Pro plans from $7/month.',
    '4.7',
    '520',
    'Realistic human motion, facial expression consistency, and Asian aesthetic styles.',
    '["Strong temporal consistency over 5+ seconds","Natural facial expression rendering","Competitive free tier"]',
    '["Lower quality on Western film aesthetics","Limited camera control precision"]',
    false
  ),
  (
    'e0000000-0000-0000-0000-000000000006',
    'midjourney-v7',
    'Midjourney v7',
    'The industry-standard AI image generator with unmatched aesthetic quality.',
    'Image Generation',
    'Paid',
    '$10 / month',
    'Basic plan: 200 image generations/month via Discord.',
    '4.8',
    '5,200',
    'Concept art, film posters, matte paintings, and artistic visual development.',
    '["Unmatched artistic aesthetic quality","Strong cinematic composition understanding","Active community and prompt library"]',
    '["Discord-only interface","Limited API access","No fine-tuning or LoRA support"]',
    true
  )
on conflict (slug) do nothing;

-- ------------------------------------------------------------------------------
-- 5. WORKFLOWS  (content.type = 'workflow')
-- ------------------------------------------------------------------------------
insert into content (id, type, status, slug, title, description, body, cover_image, reading_time, difficulty, category_id, published_at)
values
  (
    'a0000000-0000-0000-0000-000000000006',
    'workflow',
    'Published',
    'ai-commercial-production-pipeline',
    'AI Commercial Production Pipeline',
    'A complete end-to-end workflow for producing AI-generated commercials using Runway, ComfyUI, and DaVinci Resolve.',
    '## Overview

This workflow covers the full production pipeline from client brief to final delivery of a 30-second AI commercial.

## Step 1: Concept & Pre-Visualization

Generate initial concept frames using Midjourney with the client brief as a base prompt. Create a 12-frame storyboard defining shot composition and camera movement.

## Step 2: Character & Environment Generation

Use Flux 1.1 Pro for character consistency across all shots. Generate environment plates using Midjourney with consistent lighting conditions.

## Step 3: Video Generation

Process each storyboard frame through Runway Gen-3 Alpha with:
- Camera motion: specify exact pan/tilt vectors
- Motion Brush: isolate character movement zones
- Duration: 4-5 second clips per shot

## Step 4: Assembly & Compositing

Import all video clips into DaVinci Resolve. Apply optical flow interpolation via Topaz Video AI for smooth transitions.

## Step 5: Color Grade & Delivery

Apply ACES color management. Export ProRes 4444 master for broadcast delivery.',
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80',
    '20 min read',
    'Advanced',
    'c0000000-0000-0000-0000-000000000003',
    now() - interval '18 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000007',
    'workflow',
    'Published',
    'vfx-composite-pipeline',
    'VFX Composite Pipeline: Gaussian Splat to Final Render',
    'Production workflow for integrating 3D Gaussian Splat environments with live-action footage and AI-generated elements.',
    '## Step 1: Location Scanning

Capture 150+ photogrammetry images of the practical location using a drone or camera rig in a complete hemisphere pattern.

## Step 2: 3D Gaussian Splat Generation

Process images in COLMAP for camera pose estimation, then train the Gaussian Splat model using gaussian-splatting for 30,000 iterations.

## Step 3: Unreal Engine Integration

Import the PLY Gaussian Splat file into Unreal Engine 5.5 via the GaussianSplatting plugin. Calibrate virtual camera to match production camera specs.

## Step 4: AI Element Generation

Generate VFX elements (fire, smoke, particles) using Luma Dream Machine with black background prompts for easy alpha extraction.

## Step 5: Nuke Compositing

Layer all elements in Nuke:
1. Gaussian Splat background plate
2. Live-action actors (with AI rotoscope via SAM 2)
3. AI-generated VFX elements
4. Color grade to match ACES working space',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    '25 min read',
    'Expert',
    'c0000000-0000-0000-0000-000000000002',
    now() - interval '12 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000008',
    'workflow',
    'Published',
    'youtube-automation-pipeline',
    'YouTube Automation Pipeline: Script to Published Video',
    'Complete workflow for producing faceless YouTube content using AI voiceover, image generation, and automated editing.',
    '## Step 1: Script Generation

Use Claude or GPT-4 to generate a structured educational script with defined sections, hooks, and CTAs.

## Step 2: AI Voiceover

Generate voiceover using ElevenLabs Turbo v2. Clone a consistent voice persona for brand identity across all videos.

## Step 3: Visual Generation

For each script section, generate matching visuals using Midjourney or Flux. Maintain consistent style presets for brand cohesion.

## Step 4: Video Assembly

Sync visuals to audio timeline in DaVinci Resolve using beatmatch cuts. Apply subtitle burn-in via auto-caption tools.

## Step 5: Optimization & Upload

Run video through Topaz Video AI for upscaling to 4K. Schedule upload via TubeBuddy with optimized metadata and thumbnails.',
    'https://images.unsplash.com/photo-1611162616305-c69b3710bc1e?auto=format&fit=crop&w=1200&q=80',
    '15 min read',
    'Intermediate',
    'c0000000-0000-0000-0000-000000000007',
    now() - interval '7 days'
  )
on conflict (slug) do nothing;

-- workflow tags
insert into content_tags (content_id, tag_id)
values
  ('a0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000009'),
  ('a0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000003'),
  ('a0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000010'),
  ('a0000000-0000-0000-0000-000000000007',        'b0000000-0000-0000-0000-000000000004'),
  ('a0000000-0000-0000-0000-000000000007',        'b0000000-0000-0000-0000-000000000005'),
  ('a0000000-0000-0000-0000-000000000008',    'b0000000-0000-0000-0000-000000000013')
on conflict do nothing;

-- ------------------------------------------------------------------------------
-- 6. NEWS ARTICLES  (content.type = 'news')
-- ------------------------------------------------------------------------------
insert into content (id, type, status, slug, title, description, body, cover_image, reading_time, difficulty, category_id, published_at)
values
  (
    'a0000000-0000-0000-0000-000000000009',
    'news',
    'Published',
    'runway-gen-4-announced',
    'Runway Announces Gen-4: Real-Time 4K Video at 60FPS',
    'Runway unveils Gen-4 with breakthrough real-time 4K generation at 60 frames per second, setting a new industry benchmark.',
    '## Runway Gen-4 Launch

Runway has announced Gen-4, their most advanced video generation model to date. The model introduces real-time generation at 4K resolution running at 60fps, a 14× improvement over Gen-3 Alpha.

## Key Improvements

- Real-time generation: 60fps at 4K resolution.
- Enhanced camera control: 6DoF movement with sub-pixel accuracy.
- Extended duration: up to 30-second clips natively.
- Improved temporal consistency: virtually zero flickering.

## Pricing

Runway Gen-4 will be available on the Unlimited plan ($76/month) with a new credit-based option for pay-per-use access.',
    'https://images.unsplash.com/photo-1535223289429-462dc4864cd1?auto=format&fit=crop&w=1200&q=80',
    '4 min read',
    'Beginner',
    'c0000000-0000-0000-0000-000000000006',
    now() - interval '2 days'
  ),
  (
    'a0000000-0000-0000-0000-000000000010',
    'news',
    'Published',
    'flux-20-released-with-video',
    'Flux 2.0 Released with Native Video Generation Support',
    'Black Forest Labs releases Flux 2.0 with native text-to-video capabilities, challenging Runway and Sora on multiple benchmarks.',
    '## Flux 2.0 Announcement

Black Forest Labs has released Flux 2.0, a major update to their industry-leading image generation model that now includes native video generation.

## New Capabilities

- Text-to-Video: up to 10-second clips at 1080p.
- Image-to-Video: superior temporal consistency from reference images.
- Improved LoRA training: 2× faster convergence with the new Flux LoRA trainer.

## Benchmark Results

In blind tests, Flux 2.0 video scored higher than Runway Gen-3 on:
- Prompt adherence: 94% vs 88%.
- Temporal consistency: 97% vs 95%.
- Aesthetic quality: 92% vs 91%.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    '5 min read',
    'Beginner',
    'c0000000-0000-0000-0000-000000000001',
    now() - interval '1 day'
  )
on conflict (slug) do nothing;

-- news tags
insert into content_tags (content_id, tag_id)
values
  ('a0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000009'),
  ('a0000000-0000-0000-0000-000000000010',   'b0000000-0000-0000-0000-000000000010'),
  ('a0000000-0000-0000-0000-000000000010',   'b0000000-0000-0000-0000-000000000002')
on conflict do nothing;

-- ==============================================================================
-- DONE
-- ==============================================================================


