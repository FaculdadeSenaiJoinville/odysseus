export class Messages {

    public fields: Object;

    public send(key: string, labels: object | null = null): string {

        let text = this.fields[key];

        if (text) {

            if (labels) {

                for (const labelKey of Object.keys(labels)) {

                    text = text.replace(`{{${labelKey}}}`, labels[labelKey]);
                }
            }

            return text;
        }

        return `Mensagem para ${key} não encontrada.`;
    }

    constructor(fields: Object) {

        this.fields = fields;
    }

}
