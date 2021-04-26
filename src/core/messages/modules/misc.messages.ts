import { Messages } from "../utils/messages";

export const miscMessages = new Messages({
    internal_server_error: 'Ocorreu um erro interno!',

    invalid_type: 'O valor para o campo "{{field}}" deve ser do tipo "{{number}}"',

    required_field: 'Campo "{{field}}" é obrigatório.',

    characters_min: 'O campo "{{field}}" deve ter no mínimo {{value}} caracteres.'
});
