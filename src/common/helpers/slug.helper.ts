import slugify from 'slugify';

export const generateSlug = (text: string) => {
    const baseSlug = slugify(text, {
        lower: true,
        strict: true, // hapus simbol aneh
    });

    const random = Math.random().toString(36).substring(2, 6); // 🔥 random 4 char

    return `${baseSlug}-${random}`;
};