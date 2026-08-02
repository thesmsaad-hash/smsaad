import type {
  CategoryItem,
  DocItem,
  GuideItem,
  ToolItem,
  ResourceItem,
  GlossaryTerm,
} from "@/types";

export const categoriesData: CategoryItem[] = [
  {
    id: "cat-1",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Neural network architectures, transformer models, latent diffusion, and deep learning foundations for visual media.",
    iconName: "BrainCircuit",
    docCount: 18,
  },
  {
    id: "cat-2",
    slug: "video-generation",
    title: "Video Generation",
    description: "Sora, Runway Gen-3, Luma Dream Machine, AnimateDiff, and temporal consistency control in generative video.",
    iconName: "Video",
    docCount: 24,
  },
  {
    id: "cat-3",
    slug: "visual-effects",
    title: "Visual Effects (VFX)",
    description: "3D Gaussian Splatting, NeRFs, AI rotoscoping, depth extraction, camera tracking, and compositing pipelines.",
    iconName: "Sparkles",
    docCount: 20,
  },
  {
    id: "cat-4",
    slug: "filmmaking",
    title: "Filmmaking",
    description: "Cinematography principles, virtual production, LED volume workflows, shot composition, and director craft.",
    iconName: "Clapperboard",
    docCount: 16,
  },
  {
    id: "cat-5",
    slug: "creative-technology",
    title: "Creative Technology",
    description: "ComfyUI node workflows, TouchDesigner integration, custom Python scripts, control nets, and real-time engines.",
    iconName: "Cpu",
    docCount: 15,
  },
  {
    id: "cat-6",
    slug: "editing",
    title: "Editing & Post",
    description: "AI-assisted pacing, color grading math, optical flow interpolation, dynamic audio synching, and export mastering.",
    iconName: "Scissors",
    docCount: 12,
  },
  {
    id: "cat-7",
    slug: "lighting",
    title: "Lighting & Shading",
    description: "Ray-tracing physics, volumetric scattering, AI relighting models, HDR illumination, and HDRI synthesis.",
    iconName: "Sun",
    docCount: 10,
  },
  {
    id: "cat-8",
    slug: "camera",
    title: "Camera & Optics",
    description: "Anamorphic lens emulation, focal length mathematical dynamics, sensor noise profiles, and Virtual Camera Rigs.",
    iconName: "Camera",
    docCount: 11,
  },
  {
    id: "cat-9",
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Token attention manipulation, cross-attention control, negative conditioning matrix, and aesthetic keywords.",
    iconName: "Terminal",
    docCount: 14,
  },
  {
    id: "cat-10",
    slug: "audio",
    title: "Audio & Voice AI",
    description: "ElevenLabs voice cloning, sound effect synthesis (SFX), neural music generation, and binaural spatial audio.",
    iconName: "Mic",
    docCount: 9,
  },
];

export const docsData: DocItem[] = [
  {
    id: "doc-1",
    slug: "understanding-latent-diffusion-models",
    title: "Understanding Latent Diffusion Models (LDM) in AI Video & Imagery",
    category: "artificial-intelligence",
    tags: ["Diffusion Models", "Latent Space", "Architecture", "U-Net", "VAE"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "A first-principles dive into how latent diffusion operates: compressing pixel space into latent space, forward noise degradation, and reverse denoising with cross-attention.",
    readingTime: "12 min read",
    difficulty: "Advanced",
    author: {
      name: "Dr. Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Lead AI Researcher & Creative Tech Engineer",
    },
    publishedDate: "2026-01-15",
    updatedDate: "2026-02-01",
    tableOfContents: [
      { id: "pixel-vs-latent", text: "Pixel Space vs. Latent Space Compression", level: 2 },
      { id: "forward-diffusion", text: "The Forward Diffusion Process (Gaussian Noise Injection)", level: 2 },
      { id: "unet-backbone", text: "U-Net Architecture & Cross-Attention Conditioning", level: 2 },
      { id: "temporal-layers", text: "Adding Temporal Dimension for AI Video Generation", level: 2 },
      { id: "implementation-code", text: "ComfyUI Tensor Node Math", level: 2 },
      { id: "summary-faq", text: "Key Takeaways & FAQ", level: 2 },
    ],
    content: `
Latent Diffusion Models (LDMs) represent the mathematical foundation of state-of-the-art generative video systems including Stable Video Diffusion, AnimateDiff, and custom film pipelines.

## Pixel Space vs. Latent Space Compression

Standard pixel space diffusion operates directly on high-resolution image matrices (e.g., $1920 \\times 1080 \\times 3$). This incurs immense computational costs ($O(N^2)$ per layer).

LDMs solve this efficiency bottleneck by using a **Variational Autoencoder (VAE)**. The encoder $E$ maps an image $x \\in \\mathbb{R}^{H \\times W \\times 3}$ to a compressed latent representation $z = E(x)$, where $z \\in \\mathbb{R}^{h \\times w \\times c}$.

For standard SDXL and SVD implementations:
- Downsampling factor $f = H / h = 8$.
- A $1024 \\times 1024 \\times 3$ image is compressed into a $128 \\times 128 \\times 4$ latent tensor.

## The Forward Diffusion Process (Gaussian Noise Injection)

Forward diffusion incrementally adds Gaussian noise to the latent vector $z_0$ over time steps $t \\in \\{1, \\dots, T\\}$ according to a predefined noise schedule $\\beta_1, \\dots, \\beta_T$:

$$q(z_t | z_0) = \\mathcal{N}\\left(z_t; \\sqrt{\\bar{\\alpha}_t} z_0, (1 - \\bar{\\alpha}_t) \\mathbf{I}\\right)$$

where $\\alpha_t = 1 - \\beta_t$ and $\\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s$.

## U-Net Architecture & Cross-Attention Conditioning

The reverse process trains a parameter-conditioned **U-Net** $\\epsilon_\\theta(z_t, t, \\tau)$ to predict the exact noise injected at step $t$, guided by textual or visual prompt embeddings $\\tau$:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

Where:
- $Q = W_Q \\cdot \\phi(z_t)$ (Intermediate U-Net latent features)
- $K = W_K \\cdot \\tau$, $V = W_V \\cdot \\tau$ (Text encoder embeddings, e.g. CLIP / T5)

## Adding Temporal Dimension for AI Video Generation

To extend 2D diffusion into video:
1. **Temporal Self-Attention**: Each frame attends to preceding and succeeding frames in the latent sequence.
2. **Motion Vectors & Optical Flow Guidance**: Injecting velocity maps directly into temporal attention blocks.

\`\`\`python
# PyTorch Tensor Latent Denoising Step Pseudocode
import torch
import torch.nn as nn

def denoise_latent_step(unet, z_t, t, prompt_embeds, temporal_mask=None):
    # Predict noise residual
    noise_pred = unet(
        sample=z_t,
        timestep=t,
        encoder_hidden_states=prompt_embeds,
        cross_attention_kwargs={"temporal_mask": temporal_mask}
    )
    # Apply Classifier-Free Guidance (CFG)
    noise_uncond, noise_cond = noise_pred.chunk(2)
    cfg_scale = 7.5
    guided_noise = noise_uncond + cfg_scale * (noise_cond - noise_uncond)
    return guided_noise
\`\`\`
`,
    notes: [
      "Latent space compression reduces VRAM consumption by 64x compared to raw pixel space diffusion.",
      "Classifier-Free Guidance (CFG) higher than 12.0 often causes color oversaturation and temporal jitter in video models.",
    ],
    warnings: [
      "Mixing VAE decoders between different model families (e.g., SD 1.5 VAE on SDXL latents) results in severe magenta color artifacts.",
    ],
    relatedArticles: [
      { title: "3D Gaussian Splatting vs. NeRFs in VFX", slug: "3d-gaussian-splatting-vs-nerfs", category: "visual-effects" },
      { title: "Anamorphic Cinematography Prompting Guide", slug: "anamorphic-cinematography-prompting", category: "prompt-engineering" },
    ],
    faq: [
      {
        question: "Why do AI videos degrade after 4 seconds?",
        answer: "Temporal cross-attention accumulates positional drift in latent space. Techniques like motion bucket tuning and frame-by-frame latent injection mitigate this degradation.",
      },
      {
        question: "What is the role of VAE in AI Video?",
        answer: "The VAE translates the abstract noise latents back into human-visible RGB video frames at final export.",
      },
    ],
    seo: {
      title: "Latent Diffusion Models in AI Video & Film | SMSAAD Documentation",
      description: "Deep technical guide on Latent Diffusion Models (LDM), U-Net cross-attention math, VAE compression, and temporal video layers.",
      keywords: ["Latent Diffusion", "AI Video", "ComfyUI", "U-Net", "Cross-Attention", "VAE", "Sora Architecture"],
    },
    isFeatured: true,
  },
  {
    id: "doc-2",
    slug: "3d-gaussian-splatting-vs-nerfs",
    title: "3D Gaussian Splatting vs. NeRFs in Modern VFX & Virtual Production",
    category: "visual-effects",
    tags: ["3D Gaussian Splatting", "NeRF", "Virtual Production", "Unreal Engine", "VFX"],
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    description: "Comparing Neural Radiance Fields (NeRF) and 3D Gaussian Splatting (3DGS) for real-time camera tracking, environment scanning, and LED volume background rendering.",
    readingTime: "15 min read",
    difficulty: "Expert",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "VFX Supervisor & Virtual Production Architect",
    },
    publishedDate: "2026-01-20",
    updatedDate: "2026-02-02",
    tableOfContents: [
      { id: "introduction", text: "Introduction to Volumetric Scene Capture", level: 2 },
      { id: "nerf-principles", text: "Neural Radiance Fields (NeRF) Mathematical Model", level: 2 },
      { id: "gaussian-splatting", text: "3D Gaussian Splatting: Explicit Anisotropic Gaussians", level: 2 },
      { id: "performance-benchmark", text: "Real-Time FPS & Render Speed Benchmarks", level: 2 },
      { id: "vfx-pipeline", text: "Integration into Nuke, Houdini & Unreal Engine 5.5", level: 2 },
    ],
    content: `
Volumetric capture has evolved from slow ray-marched Neural Radiance Fields to high-fps rasterized 3D Gaussian Splatting. This document outlines how both technologies work under the hood and how VFX studios deploy them.

## Neural Radiance Fields (NeRF) Mathematical Model

A NeRF represents a continuous scene as a 5D vector function input: spatial location $\\mathbf{x} = (x, y, z)$ and viewing direction $\\mathbf{d} = (\\theta, \\phi)$. The output is emitted color $\\mathbf{c} = (r, g, b)$ and volume density $\\sigma$.

Using a Multi-Layer Perceptron (MLP) $F_\\Theta: (\\mathbf{x}, \\mathbf{d}) \\to (\\mathbf{c}, \\sigma)$, the pixel color $C(\\mathbf{r})$ along a ray $\\mathbf{r}(t) = \\mathbf{o} + t\\mathbf{d}$ is computed via numerical quadrature:

$$C(\\mathbf{r}) = \\sum_{i=1}^N T_i \\left(1 - \\exp(-\\sigma_i \\delta_i)\\right) \\mathbf{c}_i$$

where $T_i = \\exp\\left(-\\sum_{j=1}^{i-1} \\sigma_j \\delta_j\\right)$.

## 3D Gaussian Splatting: Explicit Anisotropic Gaussians

Unlike NeRFs (which require hundreds of neural evaluation queries per ray), 3D Gaussian Splatting replaces MLPs with millions of 3D Gaussians defined by covariance matrix $\\Sigma$ and center position $\\mu$:

$$G(x) = \\exp\\left(-\\frac{1}{2} (x - \\mu)^T \\Sigma^{-1} (x - \\mu)\\right)$$

The 3D covariance matrix $\\Sigma$ is parameterized using scaling matrix $S$ and rotation quaternion $R$:

$$\\Sigma = R S S^T R^T$$

Differentiable tile-based rasterization converts these 3D Gaussians directly into screen-space 2D Gaussians at over **200 FPS** on standard GPUs.

## Performance Benchmark Matrix

| Parameter | NeRF (Instant-NGP) | 3D Gaussian Splatting |
| :--- | :--- | :--- |
| **Representation** | Implicit MLP + Hash Grid | Explicit 3D Point Cloud |
| **Train Time** | 5 – 15 minutes | 10 – 25 minutes |
| **Render FPS (4K)** | 15 – 30 FPS | 120 – 240 FPS |
| **Editing Ability** | Extremely Difficult | Easy (Delete/Move Points) |
| **VRAM Consumption** | Low (~2 GB) | Medium-High (~8 GB) |

`,
    notes: [
      "3D Gaussian Splats can be converted directly into PLY meshes with spherical harmonics attributes for Unreal Engine 5 loading.",
    ],
    relatedArticles: [
      { title: "Understanding Latent Diffusion Models", slug: "understanding-latent-diffusion-models", category: "artificial-intelligence" },
    ],
    faq: [
      {
        question: "Can 3D Gaussian Splats be edited in Maya or Blender?",
        answer: "Yes, modern plugins allow selection, sculpting, and relighting of splat points directly in 3D viewports.",
      },
    ],
    seo: {
      title: "3D Gaussian Splatting vs NeRF for VFX & Filmmaking | SMSAAD",
      description: "Comprehensive comparison between 3D Gaussian Splatting and NeRFs for real-time virtual production and camera tracking.",
      keywords: ["3D Gaussian Splatting", "NeRF", "Virtual Production", "VFX", "Unreal Engine"],
    },
    isFeatured: true,
  },
  {
    id: "doc-3",
    slug: "comfyui-advanced-workflow-architecture",
    title: "ComfyUI Advanced Workflow Architecture for Production AI Video",
    category: "creative-technology",
    tags: ["ComfyUI", "Workflows", "Node Graph", "ControlNet", "IP-Adapter"],
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    description: "Designing deterministic, modular node pipelines in ComfyUI using AnimateDiff, IP-Adapter identity preservation, and ControlNet depth maps.",
    readingTime: "10 min read",
    difficulty: "Intermediate",
    author: {
      name: "Smsaad Lead Engineer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: "Platform Architect & Creative Technologist",
    },
    publishedDate: "2026-01-28",
    updatedDate: "2026-02-01",
    tableOfContents: [
      { id: "node-execution", text: "The Directed Acyclic Graph (DAG) Execution Model", level: 2 },
      { id: "ip-adapter", text: "Character Consistency with IP-Adapter & FaceID", level: 2 },
      { id: "control-net-depth", text: "Depth Map Temporal Stabilization", level: 2 },
    ],
    content: `
ComfyUI treats diffusion generation as a Directed Acyclic Graph (DAG), enabling precise execution order and memory caching across video generation nodes.

## The Directed Acyclic Graph (DAG) Execution Model

Unlike web UIs that lock parameters in rigid forms, ComfyUI evaluates node dependencies lazily:
- **MODEL**: Passed directly into Sampler nodes without redundant reload.
- **CLIP**: Encodes positive and negative prompt text into hidden state tensors.
- **LATENT**: Carries spatial/temporal dimensions through noise injection.

## Character Consistency with IP-Adapter

IP-Adapter projects reference image feature vectors into the cross-attention layers of the diffusion model:

\`\`\`python
# IP-Adapter Layer Ingestion
class IPAdapterAttentionBlock(nn.Module):
    def __init__(self, cross_attention_dim, ip_dim):
        super().__init__()
        self.to_k_ip = nn.Linear(ip_dim, cross_attention_dim, bias=False)
        self.to_v_ip = nn.Linear(ip_dim, cross_attention_dim, bias=False)
    
    def forward(self, hidden_states, ip_embeds, scale=0.8):
        k_ip = self.to_k_ip(ip_embeds)
        v_ip = self.to_v_ip(ip_embeds)
        out_ip = torch.matmul(torch.softmax(hidden_states @ k_ip.T / d_k), v_ip)
        return hidden_states + scale * out_ip
\`\`\`
`,
    seo: {
      title: "ComfyUI Advanced Node Graph Architecture | SMSAAD",
      description: "Master ComfyUI node graph execution, IP-Adapter character consistency, and ControlNet video pipelines.",
      keywords: ["ComfyUI", "Node Graph", "IP-Adapter", "AnimateDiff", "AI Video"],
    },
    isFeatured: true,
  },
];

export const guidesData: GuideItem[] = [
  {
    id: "guide-1",
    slug: "complete-ai-vfx-pipeline-from-script-to-screen",
    title: "The Complete AI & VFX Pipeline: From Script to Final Color Master",
    description: "A comprehensive blueprint for integrating AI generative video, 3D environment scans, neural rotoscoping, and ACES color workflow into enterprise film production.",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    category: "Filmmaking",
    readingTime: "25 min read",
    difficulty: "Advanced",
    author: {
      name: "Smsaad Editorial Team",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Senior Creative Directors",
    },
    publishedDate: "2026-01-10",
    keyTakeaways: [
      "Pre-visualization with AI image & video models saves up to 60% of storyboard budgets.",
      "Combining 3D Gaussian Splats with Virtual Camera Rigs delivers photorealistic LED volume plates.",
      "ACEScg color management prevents dynamic range compression when compositing AI generated passes.",
    ],
    content: `
# The Modern AI Filmmaking & VFX Master Blueprint

The line between traditional Visual Effects (VFX) and Artificial Intelligence has vanished. Leading studios now operate hybrid pipelines where AI models handle speed-heavy iteration while deterministic VFX packages handle precision control.

---

### Step 1: Generative Pre-Visualization & Storyboarding

Before cameras roll, directors generate dynamic sequence motion boards using text-to-video and image-to-video models.

1. **Character Concept Generation**: Establish consistent turnaround sheets using LoRA adapters.
2. **Keyframe Prompting**: Frame shot compositions with camera direction parameters (e.g. \`low angle shot, 35mm anamorphic, anamorphic lens flare, moody side lighting\`).
3. **Motion Blocking**: Pass static concept images into Runway Gen-3 or Sora to prototype timing and camera pan speeds.

---

### Step 2: Volumetric Environment Scanning (3D Gaussian Splatting)

Instead of relying on static matte paintings or costly 3D modeling of complex environments:
- Drone photogrammetry imagery is fed into 3D Gaussian Splatting algorithms.
- The resulting splat scene is imported directly into Unreal Engine 5.5.
- The virtual camera is tracked in sync with physical camera sensors via OSC protocol.

---

### Step 3: Neural Matte Extraction & AI Rotoscoping

Rotoscoping fine hair or transparent glass traditionally consumed hundreds of artist hours.
- Segment Anything Model 2 (SAM 2) isolates actors across 4K video clips in real-time.
- Temporal optical flow alignment smooths mask edges, eliminating edge chatter.

---

### Step 4: Color Grading & ACES Master Output

AI video models output RGB files in sRGB or Rec.709 color spaces. To integrate these into feature films:
1. Inverse Tone Mapping is applied to unclamp highlight data.
2. Conversion into ACEScg (Academy Color Encoding System) working color space.
3. Matching shot grain profiles using procedural noise generators.
`,
    seo: {
      title: "The Complete AI VFX Pipeline Blueprint | SMSAAD Guide",
      description: "Step-by-step master guide for production studios: combining AI video, 3D Gaussian Splatting, SAM 2 rotoscoping, and ACES color grading.",
      keywords: ["AI VFX Pipeline", "AI Filmmaking", "SAM 2", "Unreal Engine 5", "ACES Color"],
    },
    isFeatured: true,
  },
  {
    id: "guide-2",
    slug: "lighting-and-color-theory-in-generative-prompts",
    title: "Mastering Lighting & Color Physics in Generative AI Prompts",
    description: "Learn how lighting direction, volumetric light decay equations, Kelvin color temperatures, and cinematic palettes control diffusion output.",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    category: "Lighting",
    readingTime: "18 min read",
    difficulty: "Intermediate",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Lead AI Researcher",
    },
    publishedDate: "2026-01-22",
    keyTakeaways: [
      "Specifying exact Kelvin temperatures (e.g. 2700K tungsten vs 6500K daylight) yields far more consistent color output than vague terms like 'warm' or 'cool'.",
      "Directional light terms like 'Rembrandt lighting', 'chiaroscuro', and 'rim light' dictate shadow density in latent space.",
    ],
    content: `
# Lighting Physics & Latent Space Dynamics

Generative diffusion models were trained on millions of labeled cinematic frames. Understanding how light transport terms map to prompt tokens gives filmmakers granular control.

## 1. Color Temperature (Kelvin Scale Prompting)

- **2200K - Candlelight / Golden Sunset**: High orange saturation, deep warm shadows.
- **3200K - Tungsten Studio Light**: Classic Hollywood warmth, clean skin tones.
- **5600K - Daylight / HMI**: Neutral crisp white, ideal for naturalistic outdoor scenes.
- **7500K - Overcast Sky / Deep Shadow**: Cool blue bias.

## 2. Key Lighting Patterns

| Lighting Term | Latent Result | Best Used For |
| :--- | :--- | :--- |
| **Chiaroscuro** | High contrast, dark dramatic shadows | Film Noir, Thrillers |
| **Rembrandt Lighting** | Triangle shadow on cheek, 45-degree key light | Dramatic Portraits |
| **Rim Light / Kick** | Bright specular edge highlight separating subject from background | Sci-Fi, Action |
| **Volumetric God Rays** | Tyndall light scattering through haze or fog | Atmospheric Fantasy |

`,
    seo: {
      title: "Lighting & Color Physics Prompting Guide | SMSAAD",
      description: "Master Kelvin color temperatures, chiaroscuro, key light setups, and volumetric atmosphere in AI prompting.",
      keywords: ["Lighting Theory", "Color Temperature", "Kelvin", "Prompt Engineering", "Cinematography"],
    },
    isFeatured: true,
  },
];

export const toolsData: ToolItem[] = [
  {
    id: "tool-1",
    slug: "runway-gen-3-alpha",
    name: "Runway Gen-3 Alpha",
    tagline: "State-of-the-art multimodal generative video model built for filmmakers.",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    category: "Video Generation",
    bestFor: "Cinematic camera movement, high fidelity video generation, and structural motion control.",
    strengths: [
      "Unmatched camera movement precision (pan, tilt, zoom, pedestal).",
      "Motion Brush for localized velocity direction.",
      "High photorealism with 4K upscaling.",
      "Strong keyframe image-to-video alignment.",
    ],
    weaknesses: [
      "Credit-based pricing can become expensive for long iterations.",
      "Fast human hand/finger motion still experiences occasional temporal artifacts.",
    ],
    pricing: {
      model: "Paid",
      startingPrice: "$12 / month",
      details: "Standard tier includes 625 credits/month; Unlimited plan available at $76/month.",
    },
    alternatives: ["Luma Dream Machine", "OpenAI Sora", "Kling AI", "Haiper AI"],
    useCases: [
      "Cinematic pre-visualization for feature films.",
      "Commercial background plate generation.",
      "Music video VFX element generation.",
    ],
    workflow: {
      title: "High-Control Runway Motion Workflow",
      steps: [
        { stepNumber: 1, title: "Input Concept Keyframe", description: "Upload a pristine 16:9 Midjourney or Flux render." },
        { stepNumber: 2, title: "Define Camera Motion Vectors", description: "Set Camera Control: Pan Right +0.5, Zoom In +0.3." },
        { stepNumber: 3, title: "Apply Motion Brush", description: "Paint actor hair or flowing water to isolate dynamic motion zones." },
        { stepNumber: 4, title: "Render & Optical Flow Interpolation", description: "Export 1080p clip and apply Topaz Video AI frame interpolation." },
      ],
    },
    faq: [
      {
        question: "Can Runway Gen-3 be controlled with camera parameters?",
        answer: "Yes, Gen-3 provides multi-axis camera controls for pan, tilt, roll, zoom, and camera speed.",
      },
    ],
    relatedDocs: [
      { title: "Understanding Latent Diffusion Models", slug: "understanding-latent-diffusion-models" },
      { title: "ComfyUI Advanced Workflow Architecture", slug: "comfyui-advanced-workflow-architecture" },
    ],
    latestUpdates: "Gen-3 Alpha Turbo introduced for 7x faster generation speeds.",
    isFeatured: true,
    seo: {
      title: "Runway Gen-3 Alpha Review & Workflow Guide | SMSAAD AI Tools",
      description: "In-depth review of Runway Gen-3 Alpha: features, pricing, motion brushes, camera controls, and production workflow.",
      keywords: ["Runway Gen-3", "AI Video Generator", "Motion Brush", "Generative Video", "RunwayML"],
    },
  },
  {
    id: "tool-2",
    slug: "luma-dream-machine",
    name: "Luma Dream Machine",
    tagline: "High-speed, hyper-realistic video generation model with physical simulation dynamics.",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80",
    category: "Video Generation",
    bestFor: "Complex physics simulation, fluid dynamics, explosion VFX, and fast shot turnarounds.",
    strengths: [
      "Rapid render generation speeds (~120 seconds).",
      "Exceptional understanding of physical momentum and object interaction.",
      "Free tier available for testing.",
    ],
    weaknesses: [
      "Slightly lower text prompt adherence on intricate camera instructions compared to Runway.",
    ],
    pricing: {
      model: "Freemium",
      startingPrice: "$29.99 / month",
      details: "Free plan allows 30 generations per month. Paid tiers offer priority queues.",
    },
    alternatives: ["Runway Gen-3 Alpha", "Kling AI", "Sora"],
    useCases: [
      "VFX fluid and fire element generation.",
      "Rapid concept prototyping.",
    ],
    workflow: {
      title: "VFX Element Generation Pipeline",
      steps: [
        { stepNumber: 1, title: "Text Prompt Specification", description: "Prompt for black background element: 'Explosion of blue liquid mercury, isolated black background, high frame rate slow motion'." },
        { stepNumber: 2, title: "Alpha Keying", description: "Import generated MP4 into Nuke or DaVinci Resolve and apply luminance key." },
      ],
    },
    faq: [
      {
        question: "Does Luma Dream Machine support camera keyframing?",
        answer: "Yes, camera start and end frames can be specified for keyframe interpolation.",
      },
    ],
    relatedDocs: [
      { title: "3D Gaussian Splatting vs NeRFs", slug: "3d-gaussian-splatting-vs-nerfs" },
    ],
    isFeatured: true,
    seo: {
      title: "Luma Dream Machine AI Video Tool Breakdown | SMSAAD",
      description: "Complete breakdown of Luma Dream Machine: fluid dynamics, physics simulation, pricing, and keying workflows.",
      keywords: ["Luma Dream Machine", "Luma AI", "AI Video Generation", "VFX Elements"],
    },
  },
];

export const resourcesData: ResourceItem[] = [
  {
    id: "res-1",
    slug: "comfyui-shortcut-cheatsheet",
    title: "ComfyUI Master Keyboard & Node Shortcut Cheat Sheet",
    category: "creative-technology",
    type: "cheatsheet",
    description: "Quick reference card for all essential ComfyUI hotkeys, node search tricks, group organization, and memory purge commands.",
    tags: ["ComfyUI", "Shortcuts", "Workflow", "Cheatsheet"],
    updatedAt: "2026-02-01",
    content: `
# ComfyUI Power User Keyboard Shortcuts

### General Navigation
- **Double Click Canvas**: Open Quick Search Node menu.
- **Ctrl + Enter**: Queue current node execution batch.
- **Ctrl + Shift + Enter**: Queue front of execution queue.
- **Ctrl + R**: Refresh node definition registry.
- **Space Bar + Drag**: Pan across infinite canvas.

### Node Manipulation
- **Ctrl + G**: Group selected nodes.
- **Ctrl + M**: Mute selected nodes (bypasses execution without deleting).
- **Ctrl + B**: Bypass selected nodes (passes inputs through directly to outputs).
- **Alt + Drag**: Duplicate selected nodes with connections intact.

### Memory & VRAM Management
- **Unload Models Command**: Forces PyTorch CUDA cache clearing.
`,
  },
  {
    id: "res-2",
    slug: "cinematic-camera-prompting-templates",
    title: "Master Cinematic Camera & Optics Prompt Templates",
    category: "prompt-engineering",
    type: "template",
    description: "Copy-paste prompt formulas for matching 35mm, 70mm IMAX, anamorphic lenses, bokeh patterns, and camera angles.",
    tags: ["Prompt Templates", "Cinematography", "Camera Rigs", "Midjourney"],
    updatedAt: "2026-01-25",
    content: `
# Master Prompt Template Structure

\`\`\`
[Subject & Motion] + [Shot Framing] + [Lens & Optics] + [Lighting & Kelvin] + [Film Stock & Color Space] + [Aesthetic Parameters]
\`\`\`

### Template 1: Anamorphic Sci-Fi Portrait
\`\`\`text
Extreme close-up shot of a cybernetic pilot wearing a reflective helmet, 85mm Panavision Primo Anamorphic lens, f/1.4 aperture, horizontal blue streak lens flare, warm tungsten interior light 3200K contrasting cool cyan volumetric haze outdoors 6500K, Kodak Vision3 500T 35mm grain profile, award-winning cinematography --ar 2.39:1 --style raw
\`\`\`

### Template 2: IMAX 70mm Landscape Tracking Shot
\`\`\`text
Low-angle tracking shot following a rover traversing crimson desert dunes, shot on Hasselblad 70mm IMAX camera, ultra-wide 18mm lens, sharp focus edge-to-edge, harsh direct sunlight 5600K, deep contrast shadows, atmospheric dust motes in motion, high dynamic range --ar 1.90:1
\`\`\`
`,
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Classifier-Free Guidance (CFG)",
    slug: "classifier-free-guidance",
    category: "artificial-intelligence",
    definition: "A technique in diffusion models that balances visual adherence to the prompt against image diversity by blending unconditioned and conditioned noise predictions.",
    relatedDocs: [{ title: "Understanding Latent Diffusion Models", slug: "understanding-latent-diffusion-models" }],
  },
  {
    term: "3D Gaussian Splatting (3DGS)",
    slug: "3d-gaussian-splatting",
    category: "visual-effects",
    definition: "A rasterization technique representing 3D scenes as millions of anisotropic 3D Gaussians with position, opacity, rotation, scale, and spherical harmonic colors.",
    relatedDocs: [{ title: "3D Gaussian Splatting vs NeRFs", slug: "3d-gaussian-splatting-vs-nerfs" }],
  },
  {
    term: "AnimateDiff",
    slug: "animatediff",
    category: "video-generation",
    definition: "A temporal motion module plug-in for Stable Diffusion models that injects multi-frame attention mechanisms to turn text-to-image models into video generators.",
    relatedDocs: [{ title: "ComfyUI Advanced Workflow Architecture", slug: "comfyui-advanced-workflow-architecture" }],
  },
  {
    term: "Variational Autoencoder (VAE)",
    slug: "variational-autoencoder",
    category: "artificial-intelligence",
    definition: "A neural network architecture that encodes raw pixel space images into a lower-dimensional latent distribution, allowing diffusion models to operate efficiently.",
    relatedDocs: [{ title: "Understanding Latent Diffusion Models", slug: "understanding-latent-diffusion-models" }],
  },
  {
    term: "ACEScg",
    slug: "acescg",
    category: "filmmaking",
    definition: "Academy Color Encoding System color space designed specifically for computer graphics and visual effects, utilizing AP1 primary colors and linear color curve gamma.",
    relatedDocs: [{ title: "The Complete AI & VFX Pipeline", slug: "complete-ai-vfx-pipeline-from-script-to-screen" }],
  },
];
