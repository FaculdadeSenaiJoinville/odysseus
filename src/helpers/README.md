# Helpers
Helpers são classes auxiliares que possuem funções simples que não fazem parte do fluxo principal da aplicação, mas alguns modulos podem depender delas.

> **Atenção:** Neste diretório deverão ser inseridos apenas helpers globais, ou seja, helpers que podem ser utilizados por qualquer modulo do sistema. Helpers específicos de um módulo devem ser criados dentro da pasta "utils" do próprio múdulo. Ex: "users/utils/user.helper.ts"

# Criando um helper
Para criar um helper é bem simples, basta criar um arquivo com a extensão "helper.ts" neste diretório dentro da pasta "classes", a estrutura do arquivo deve seguir um padrão de classe injetável do NestJS.

### **Exemplo:**
### Helper para erros genéricos 
- Diretório: "src/helpers/classes"
- Nome do arquivo: "error.helper.ts"
- Código:
  
```javascript
// src/helpers/classes/error.helper.ts

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHelper {
    
    public throwInternalServerError = (): never => {

        throw new BadRequestException(miscMessages.send('internal_server_error'));
    }
}
```
- Exportar a classe do helper através do arquivo "index.ts" neste mesmo diretório.
- Código:
```javascript
// src/helpers/index.ts

export * from './classes/error.helper';
```

Neste exemplo é criado um helper chamado ErrorHelper que possui apenas função publica chamada "throwInternalServerError" que tem a única finalidade de lançar um erro 500, algo que pode ser utilizado em qualquer módulo do sistema.

# Utilizando um helper
Podemos utilizar esse helper de duas maneiras: dentro de um módulo ou em uma classe qualquer.

## 1 - Utilizando dentro de um módulo:
Para utilizarmos dentro de um módulo deve-se primeiro importar o helper no arquivo ".module.ts", adicioná-lo ao array de providers, referenciá-lo no constructor da classe em que deseja e por fim utilizá-lo.

### **Exemplo:**
### Utilizando o helper para erros genéricos 
- Diretório: "src/modules/users"
- No arquivo "user.module.ts" importar o helper de erros
- 