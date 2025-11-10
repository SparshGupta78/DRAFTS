type HTMLContent = string;
type JSONContent = {
    type?: string;
    attrs?: Record<string, any> | undefined;
    content?: JSONContent[];
    marks?: {
        type: string;
        attrs?: Record<string, any>;
        [key: string]: any;
    }[];
    text?: string;
    [key: string]: any;
};
export type Content = HTMLContent | JSONContent | JSONContent[] | null;