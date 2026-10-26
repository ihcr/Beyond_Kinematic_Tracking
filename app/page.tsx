import { Braces, FileText, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const paperUrl = 'https://arxiv.org/abs/2610.19393';
const videoId = '5EmDvZdKiBY';
const labUrl = 'https://ucl-humanoid.github.io/';
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="mx-auto max-w-5xl px-5 pb-12 pt-16 text-center sm:pt-24">
        <h1 className="text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          Beyond Kinematic Tracking: Preserving Expressive Characteristics in
          Humanoid Whole-Body Control
        </h1>

        <p className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1 text-lg text-blue-600 sm:text-xl">
          <span>Lingfan Bao</span><span className="text-slate-300">·</span>
          <span>Hanshang Zhu</span><span className="text-slate-300">·</span>
          <span>Yan Pan</span><span className="text-slate-300">·</span>
          <span>Jincheng Wang</span><span className="text-slate-300">·</span>
          <span>Jingyang Yu</span><span className="text-slate-300">·</span>
          <span>Tianhu Peng</span><span className="text-slate-300">·</span>
          <span>Yiyang Jia</span><span className="text-slate-300">·</span>
          <span>Dimitrios Kanoulas</span><span className="text-slate-300">·</span>
          <a className="hover:underline" href="mailto:chengxu.zhou@ucl.ac.uk">Chengxu Zhou</a>
        </p>
        <p className="mt-3 text-base text-slate-500">
          <a className="text-blue-600 hover:underline" href={labUrl} target="_blank" rel="noreferrer">
            UCL Humanoid Robotics Lab
          </a>
          <span className="mx-2 text-slate-300">·</span>
          Department of Computer Science, University College London
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            render={<a href={paperUrl} target="_blank" rel="noreferrer" />}
            nativeButton={false}
            className="h-11 rounded-md bg-slate-800 px-5 text-white hover:bg-slate-700"
          >
            <FileText className="size-4" aria-hidden="true" /> arXiv
          </Button>
          <Button
            disabled
            className="h-11 cursor-not-allowed rounded-md border-slate-200 bg-slate-100 px-5 text-slate-400 disabled:opacity-100"
          >
            <Braces className="size-4" aria-hidden="true" /> Code (coming soon)
          </Button>
          <Button
            render={<a href="#video" />}
            nativeButton={false}
            className="h-11 rounded-md bg-slate-800 px-5 text-white hover:bg-slate-700"
          >
            <PlayCircle className="size-4" aria-hidden="true" /> Video
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-balance text-lg leading-8 text-slate-600">
          A residual policy on top of a frozen whole-body tracker that restores the amplitude, energy, body expansion, body lean, and pelvis height of expressive motions on a 29-DoF Unitree G1.
        </p>
      </header>

      {/* 无标题：视频作为 hero 的延伸紧跟其后，与 Abstract 的间距由后者自身的 padding 提供 */}
      <section className="mx-auto max-w-6xl px-5 pt-2 sm:pt-4" id="video" aria-label="Video">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-black shadow-sm">
          <iframe
            className="aspect-video w-full bg-black"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title="Beyond Kinematic Tracking project video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="paper-section" id="abstract">
        <h2>Abstract</h2>
        <p>
          Whole-body control plays a crucial role in enabling humanoid robots to execute expressive motions. Faithful execution requires preserving both the intended action and its expressive characteristics. Existing whole-body trackers typically balance joint and keypoint tracking with physical stability across diverse motions, but these objectives do not necessarily prioritize the expressive characteristics of each action. Our analysis shows that lower average positional tracking error does not guarantee better preservation of dynamic and postural motion characteristics. To address this gap, we propose a residual learning framework with compensation objectives targeting amplitude, energy, body expansion, body lean, and pelvis height. To concentrate compensation while limiting interference with the underlying tracking behavior, motion-aware gating allocates correction capacity according to body-part activity, preserving larger correction ranges in more active parts and restricting them elsewhere. For each frozen tracker, we train motion-specific residual policies and distill them into a unified policy shared across motion categories. Simulation and physical experiments on the Unitree G1 across eight motion categories demonstrate superior preservation of dynamic and postural motion characteristics compared with the corresponding baselines.
        </p>
      </section>

      <section className="paper-section wide-section" id="framework">
        <h2>Framework</h2>
        <figure className="mt-8">
          <picture>
            <source srcSet={`${assetBase}/framework.webp`} type="image/webp" />
            <img
              className="mx-auto h-auto w-full"
              src={`${assetBase}/framework.png`}
              width={2400}
              height={1160}
              alt="Overview of the residual compensation framework: data curation, motion-specific teachers distilled into a unified student, and deployment on top of a frozen tracker with motion-aware gating"
            />
          </picture>
          <figcaption className="mx-auto mt-5 max-w-4xl text-center text-sm leading-6 text-slate-500">
            Overview of the residual compensation framework. Human motions are retargeted to the G1, filtered, and segmented into motion units. For each frozen tracker, motion-specific residual teachers are trained with compensation objectives (Stage I) and distilled into a unified student shared across motion categories (Stage II). At deployment the student augments the frozen tracker, and motion-aware gating sets the correction range of each body part from its reference activity.
          </figcaption>
        </figure>
        <div className="mt-12 grid gap-8 text-left md:grid-cols-3">
          <div>
            <h3>Expressive Motion Descriptors</h3>
            <p>Five descriptors are computed over motion units from joint angles and forward-kinematic keypoints: amplitude and energy describe dynamics, while body expansion, body lean, and pelvis height describe posture. They serve both as compensation objectives and as evaluation metrics, and a lower average positional tracking error does not guarantee that they are preserved.</p>
          </div>
          <div>
            <h3>Motion-Aware Gating</h3>
            <p>The residual on each joint is bounded by a gate driven by reference activity. The most active body group receives the full ±0.2 rad correction range, and every group keeps at least ±0.04 rad for postural adjustment, so correction concentrates where the motion is and interferes little with the tracker elsewhere.</p>
          </div>
          <div>
            <h3>Teacher–Student Distillation</h3>
            <p>For each frozen tracker, eight motion-specific residual teachers are trained with PPO and distilled into one unified policy. The tracker weights stay untouched, so the same recipe applies to SONIC, GMT, and TWIST2 without retraining them.</p>
          </div>
        </div>
      </section>

      <section className="paper-section wide-section" id="results">
        <h2>Results</h2>
        <p className="mx-auto max-w-4xl text-center">
          Simulation and physical experiments on the Unitree G1 cover eight motion categories (walk, kick, punch, crouch, wave, clap, cross arms, and bow) and three frozen trackers (SONIC, GMT, and TWIST2). In simulation, residual compensation reaches the lowest action-averaged error in all five characteristics for every tracker, while completion rates stay above 98%. On the physical robot, all five characteristic errors also drop for each tracker.
        </p>
        <figure className="mt-10">
          <picture>
            <source srcSet={`${assetBase}/teaser.webp`} type="image/webp" />
            <img
              className="mx-auto h-auto w-full"
              src={`${assetBase}/teaser.png`}
              width={2150}
              height={454}
              alt="Five pairs of Unitree G1 executions without and with residual compensation, one pair per characteristic"
            />
          </picture>
          <figcaption className="mx-auto mt-5 max-w-4xl text-center text-sm leading-6 text-slate-500">
            Residual compensation for expressive motions on the Unitree G1. Pairs show executions without (left) and with (right) compensation for (a) amplitude, (b) energy, (c) body expansion, (d) body lean, and (e) pelvis height.
          </figcaption>
        </figure>
        <figure className="mt-12">
          <picture>
            <source srcSet={`${assetBase}/physical.webp`} type="image/webp" />
            <img
              className="mx-auto h-auto w-full"
              src={`${assetBase}/physical.png`}
              width={2164}
              height={832}
              alt="Physical Unitree G1 executions without and with compensation, with blue reference overlays"
            />
          </picture>
          <figcaption className="mx-auto mt-5 max-w-4xl text-center text-sm leading-6 text-slate-500">
            Physical executions without (left) and with (right) compensation; blue overlays show the references. Arrows in (c) show hand excursion; markers show hand separation in (d) and projected reference deviations in (e)–(g).
          </figcaption>
        </figure>
      </section>

      <footer className="mt-8 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>
          Beyond Kinematic Tracking ·{' '}
          <a className="hover:underline" href={labUrl} target="_blank" rel="noreferrer">
            UCL Humanoid Robotics Lab
          </a>{' '}
          · University College London · 2026
        </p>
      </footer>
    </main>
  );
}
