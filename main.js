//705.484.450-52  070.987.720-03
/*


7x 0x 5x 4x 8x 4x 4x 5x 0x
10 9  8  7  6  5  4  3  2
70 0  40 28 48 20 16 15 0 = 237

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9 8  7  6  5  4  3  2
70 0  40 28 48 20 16 15 0  10 = 284

11 - (237 % 11) = 5 (Primeiro digito)
11 - (284 % 11) = 5 (Primeiro digito)
*/

//Para capturar e limpar o cpf enviado
function ValidaCPF (cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo',{ get: function(){
        return cpfEnviado.replace(/\D+/g, ''); ///\D+/g é qualquer caractere que não seja um número
    }
    });
};

ValidaCPF.prototype.valida = function(){
    if (typeof this.cpfLimpo === 'undefined')return false;
    if(this.cpfLimpo.length != 11) return false;
    if (this.isSequencia()) return false;


    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    //Para criar o digito final do cpf
    const novoCpf = cpfParcial + digito1 + digito2;
    
    //Se o novo cpf for igual ao enviado então o cpf enviado é válido
    return novoCpf === this.cpfLimpo;
}

//Para criar o digito do cpf
ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial)
    contadorRegressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, val) => {
        ac += Number(val) * contadorRegressivo--
        return ac
    }, 0)
    let digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito);
}

//Para checar se os números do cpf não são todos iguais
ValidaCPF.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}

const cpf = new ValidaCPF('070.987.720-03')

if (cpf.valida()){
    console.log('CPF válido');
} else{
    console.log('CPF inválido');
};


