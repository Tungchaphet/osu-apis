declare function requestHandlers(options: {
    path: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: object;
    querys?: object;
    auth?: string;
}): Promise<any>;
export { requestHandlers };
