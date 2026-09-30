"use client";

import { useEffect, useRef, useState } from "react";

type ScrambleTextProps = {
    text: string;
    duration?: number;
    className?: string;
};

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function ScrambleText({
    text,
    duration = 900,
    className = "",
}: ScrambleTextProps) {
    const [displayText, setDisplayText] =
        useState(text);

    const animationFrame =
        useRef<number | null>(null);


    useEffect(() => {
        const startTime =
            performance.now();

        const animate = (
            currentTime: number
        ) => {
            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const revealedCount =
                Math.floor(
                    progress *
                        text.length
                );

            let result = "";

            for (
                let i = 0;
                i < text.length;
                i++
            ) {
                if (i < revealedCount) {
                    result += text[i];
                } else {
                    result +=
                        characters[
                            Math.floor(
                                Math.random() *
                                    characters.length
                            )
                        ];
                }
            }

            setDisplayText(result);

            if (progress < 1) {
                animationFrame.current =
                    requestAnimationFrame(
                        animate
                    );
            } else {
                setDisplayText(text);
            }
        };

        animationFrame.current =
            requestAnimationFrame(
                animate
            );

        return () => {
            if (
                animationFrame.current !==
                null
            ) {
                cancelAnimationFrame(
                    animationFrame.current
                );
            }
        };
    }, [text, duration]);


    return (
        <span className={className}>
            {displayText}
        </span>
    );
}