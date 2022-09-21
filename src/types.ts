export interface Entity {
    id: string;
    position?: Point | Array<Point>;
    [key: string]: any;
}

export interface Point {
    x: number;
    y: number;
    layer?: string;
    zoomRange?: [number, number];
}

export interface Path {
    from_id: string;
    to_id: string;
    points?: Array<Point>;
}