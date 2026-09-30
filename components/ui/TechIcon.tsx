"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  Database,
  Cpu,
  Code2,
  Wrench,
  Search,
  X,
  List,
  Network,
  Brain,
  BarChart3,
} from "lucide-react";

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiDart,
  SiC,
  SiPytorch,
  SiScikitlearn,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiSupabase,
  SiVercel,
  SiPostgresql,
  SiMysql,
  SiFigma,
} from "react-icons/si";

import { useEffect, useState } from "react";

type TechIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function TechIcon({
  name,
  size = 22,
  className = "",
}: TechIconProps) {
  const iconProps = {
    size,
    className,
  };

switch (name) {
    case "Python":
        return <SiPython {...iconProps} />;

    case "TypeScript":
        return <SiTypescript {...iconProps} />;

    case "JavaScript":
        return <SiJavascript {...iconProps} />;

    case "Dart":
        return <SiDart {...iconProps} />;

    case "C":
        return <SiC {...iconProps} />;

    case "PyTorch":
        return <SiPytorch {...iconProps} />;

    case "Scikit-learn":
        return <SiScikitlearn {...iconProps} />;

    case "Transformers":
        return <Brain {...iconProps} />;

    case "FAISS":
        return <Network {...iconProps} />;

    case "LoRA":
        return <Brain {...iconProps} />;

    case "Computer Vision":
        return <Brain {...iconProps} />;

    case "Pandas":
        return <SiPandas {...iconProps} />;

    case "NumPy":
        return <SiNumpy {...iconProps} />;

    case "Matplotlib":
        return <BarChart3 {...iconProps} />;

    case "SciPy":
        return <SiScipy {...iconProps} />;

    case "Next.js":
        return <SiNextdotjs {...iconProps} />;

    case "React":
        return <SiReact {...iconProps} />;

    case "Flutter":
        return <SiFlutter {...iconProps} />;

    case "Express.js":
        return <SiExpress {...iconProps} />;

    case "Tailwind CSS":
        return <SiTailwindcss {...iconProps} />;

    case "Git":
        return <SiGit {...iconProps} />;

    case "GitHub":
        return <SiGithub {...iconProps} />;

    case "Supabase":
        return <SiSupabase {...iconProps} />;

    case "Hugging Face":
        return <SiHuggingface {...iconProps} />;

    case "Vercel":
        return <SiVercel {...iconProps} />;

    case "PostgreSQL":
        return <SiPostgresql {...iconProps} />;

    case "MySQL":
        return <SiMysql {...iconProps} />;

    case "Figma":
        return <SiFigma {...iconProps} />;

    case "SQL":
        return <Database {...iconProps} />;

    default:
        return <Code2 {...iconProps} />;
    }
}