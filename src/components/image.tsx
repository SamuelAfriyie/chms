/**
 * Mimics Next.js Image component behavior
 * Usage: <Image src="/path.png" className="rounded-md" fill />
 */
export const Image = ({ src, alt, className = "", fill = false, ...props }: any) => {
    const baseClasses = "object-cover transition-opacity duration-300";

    // If 'fill' is true, it acts like Next.js layout="fill"
    if (fill) {
        return (
            <img
                src={src}
                alt={alt || ""}
                className={`${baseClasses} absolute inset-0 w-full h-full ${className}`}
                loading="lazy"
                decoding="async"
                {...props}
            />
        );
    }

    // Default behavior if not filling
    return (
        <img
            src={src}
            alt={alt || ""}
            className={`${baseClasses} ${className}`}
            loading="lazy"
            {...props}
        />
    );
};
