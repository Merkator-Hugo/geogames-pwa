export class Editable {
    private sealed: boolean;
    private code: string;

    constructor() {
        this.sealed = false;
    }

    public isSealed(): boolean {
        return this.sealed;
    }

    public seal() {
        this.sealed = true;
    }

    public unseal(code: string) {
        if (this.code === code) {
            this.sealed = false;
        }
    }
}
