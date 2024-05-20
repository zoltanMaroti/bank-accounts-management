import React, { ReactNode, useRef, useState, useEffect, Children } from "react";
import Pagination from "@/components/HorizontalScroll/components/Pagination";

const HorizontalScroll = ({ children }: { children: ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [pages, setPages] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [showPagination, setShowPagination] = useState(false);

    const childrenArray = Children.toArray(children);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const scrollToPage = (pageIndex: number) => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            containerRef.current.scrollTo({
                left: containerWidth * pageIndex,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const scrollLeft = containerRef.current.scrollLeft;
                const currentPageIndex = Math.ceil(scrollLeft / containerWidth);
                setScrollPosition(currentPageIndex);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);

            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const totalWidth = containerRef.current.scrollWidth;
                const pages = Math.ceil(totalWidth / containerWidth);
                setPages(pages);
                setShowPagination(totalWidth > containerWidth);
            }
        };

        if (isMounted) {
            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [isMounted, childrenArray]);

    return (
        <div className='flex flex-col w-full'>
            <div
                ref={containerRef}
                className='flex gap-2 overflow-x-scroll no-scrollbar'
            >
                {childrenArray}
            </div>
            <div className='h-2 mt-4'>
                {isMounted && showPagination && (
                    <Pagination
                        pages={pages}
                        scrollPosition={scrollPosition}
                        onClick={scrollToPage}
                    />
                )}
            </div>
        </div>
    );
};

export default HorizontalScroll;
