declare global {
    function thingThatDoesNotExist(): any;
}
export declare const Service: {
    events: string[];
    find(): Promise<{
        id: number;
        description: string;
    }[]>;
    get(name: any, params: any): Promise<{
        id: any;
        description: string;
    }>;
    create(data: any): Promise<any>;
    update(id: any, data: any): Promise<any>;
    patch(id: any, data: any): Promise<any>;
    remove(id: any): Promise<{
        id: any;
    }>;
};
