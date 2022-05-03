export class CartMain {
    private id: string;
    private name: string;
    private code: string;

    constructor() {}

    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }

    public getCode(): string {
        return this.code;
    }
    public setCode(code: string): void {
        this.code = code;
    }

    public isSealed(): boolean {
        return (this.code !== null && this.code !== undefined && this.code !== '');
    }

}
