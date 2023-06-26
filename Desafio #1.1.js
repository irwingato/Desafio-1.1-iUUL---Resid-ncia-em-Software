import PromptSync from 'prompt-sync';

const prompt = PromptSync({ sigint: true });

class Vertice{
    constructor(x, y){
        this.Posx = x;
        this.Posy = y;
    }   

    get x() {
        return this.Posx;
    }
    
    get y() {
        return this.Posy;
    }

    distancia(outroVertice){
        const deltaX = outroVertice.x - this.Posx;
        const deltaY = outroVertice.y - this.Posy;    
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    move(x,y) {
        this.Posx = x;
        this.Posy = y;
    }

    equals(outroVertice){
        return this.Posx == outroVertice.x && this.Posy == outroVertice.y;
    }
}

console.log("Digite as coordenadas para o primeiro vértice:");
const x1 = parseFloat(prompt('Valor de x:'));
const y1 = parseFloat(prompt('Valor de y:'));
var vertice1 = new Vertice(x1, y1);

console.log("Digite as coordenadas para o segundo vértice:");
const x2 = parseFloat(prompt('Valor de x:'));
const y2 = parseFloat(prompt('Valor de y:'));
let vertice2 = new Vertice(x2, y2);

console.log("Digite as coordenadas para o terceiro vértice:");
const x3 = parseFloat(prompt('Valor de x:'));
const y3 = parseFloat(prompt('Valor de y:'));
let vertice3 = new Vertice(x3, y3);

console.log('---Resultados---');
console.log('Coordenadas do Vértice 1: ', vertice1.x, vertice1.y);
console.log('Coordenadas do Vértice 2: ', vertice2.x, vertice2.y);
console.log('Coordenadas do Vértice 3: ', vertice3.x, vertice3.y);

console.log('Distâncias entre Vértice 1 e Vértice 2:', vertice1.distancia(vertice2));
console.log('Distâncias entre Vértice 2 e Vértice 3:', vertice2.distancia(vertice3));
console.log('Distâncias entre Vértice 3 e Vértice 1:', vertice3.distancia(vertice1));

console.log('Movendo Vértice 1: para (5,5)...');
vertice1.move(5,5);
console.log('Novas coordenadas do Vértice 1: ', vertice1.x, vertice1.y);

console.log('Vértice 2 é igual a Vértice 3?', vertice2.equals(vertice3));

class Triangulo {
    constructor(vertice1, vertice2, vertice3){
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.vertice3 = vertice3;
    
        //Verifica se os vértices formam um triângulo
        const a = vertice1.distancia(vertice2);
        const b = vertice2.distancia(vertice3);
        const c = vertice3.distancia(vertice1);
        if(a + b <= c || b + c <=a || c + a <= b){
            throw new Error('Os vértices não formam um triângulo');        
        }
    }
    equals(outroTriangulo){
        const vertices1 = [this.vertice1, this.vertice2, this.vertice3].sort((a,b) => a.x - bx || a.y - b.y);
        const vertices2 = [outroTriangulo.vertice1, outroTriangulo.vertice2, outroTriangulo.vertice3].sort((a,b) => a.x - bx || a.y - b.y);
        return vertices1.every((v, i) => v.x === vertices2[i].x && v.y === vertices2[i].y);

    }

    perimetro(){
        const a = this.vertice1.distancia(this.vertice2);
        const b = this.vertice2.distancia(this.vertice3);
        const c = this.vertice3.distancia(this.vertice1);
        return a + b + c;
    }

    tipo() {
        const a = this.vertice1.distancia(this.vertice2);
        const b = this.vertice2.distancia(this.vertice3);
        const c = this.vertice3.distancia(this.vertice1);
        
        if (a === b && b === c){
            return 'equilátero';
        } else if(a === b || b === c || c === a){
            return 'isósceles';
        } else {
            return 'escaleno';
        }
    }

    clone() {
        return new Triangulo(
            new Vertice(this.vertice1.x, this.vertice1.y),
            new Vertice(this.vertice2.x, this.vertice2.y),
            new Vertice(this.vertice3.x, this.vertice3.y)
        );
    }

    area() {
        const a = this.vertice1.distancia(this.vertice2);
        const b = this.vertice2.distancia(this.vertice3);
        const c = this.vertice3.distancia(this.vertice1);
        const s = this.perimetro() / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}

//Criar 3 triângulos 
const triangulos = [];

for (let i = 0; i < 3; i++) {
    console.log(`Digite as coordenadas para o Triângulo ${i + 1}:`);
    let v1x = parseFloat(prompt('Valor de x para o vértice 1: '));
    let v1y = parseFloat(prompt('Valor de y para o vértice 1: '));
    const vertice1Triangulo = new Vertice(v1x, v1y);

    let v2x = parseFloat(prompt('Valor de x para o vértice 2: '));
    let v2y = parseFloat(prompt('Valor de y para o vértice 2: '));
    const vertice2Triangulo = new Vertice(v2x, v2y);

    let v3x = parseFloat(prompt('Valor de x para o vértice 3: '));
    let v3y = parseFloat(prompt('Valor de y para o vértice 3: '));
    const vertice3Triangulo = new Vertice(v3x, v3y);

    try {
        const triangulo = new Triangulo(vertice1Triangulo, vertice2Triangulo, vertice3Triangulo);
        triangulos.push(triangulo);
    } catch (error) {
        console.error(error.message);
        i--;  // Reduz o contador para repetir a entrada para o triângulo inválido.
    }
}

// Chamar os métodos para os triângulos criados
for (let i = 0; i < triangulos.length; i++) {
    const triangulo = triangulos[i];
    
    console.log(`Triângulo ${i + 1}:`);
    console.log('Perímetro:', triangulo.perimetro());
    console.log('Tipo:', triangulo.tipo());
    console.log('Área:', triangulo.area());
    console.log('Clone:', triangulo.clone());
    console.log('---');
  }

  class Poligono {
    constructor() {
      this.vertices = [];
  
      let numVertices = parseInt(prompt("Quantos vértices tem o polígono?"));
  
      while (numVertices < 3) {
        numVertices = parseInt(prompt("O polígono deve ter pelo menos 3 vértices. Quantos vértices tem o polígono?"));
      }
  
      for (let i = 0; i < numVertices; i++) {
        let x = parseFloat(prompt(`Digite a coordenada x do vértice ${i+1}:`));
        let y = parseFloat(prompt(`Digite a coordenada y do vértice ${i+1}:`));
        this.vertices.push(new Vertice(x, y));
      }
    }
  
    addVertice(vertice){
      if(this.vertices.includes(vertice)){
        return false;
      } else {
        this.vertices.push(vertice);
        return true;
      }
    }
  
    get perimetro() {
      let perimetro = 0;
      for (let i = 0; i < this.vertices.length; i++) {
        const v1 = this.vertices[i];
        const v2 = i === this.vertices.length - 1 ? this.vertices[0] : this.vertices[i + 1];
        perimetro += v1.distancia(v2);
      }
      return perimetro;
    }
  
    get qtdVertices(){
      return this.vertices.length;
    }
  }
  
  console.log('Criando um polígono. Informe os dados dos vértices:');
  const poligono = new Poligono();
  
  console.log('Quantidade de vértices:', poligono.qtdVertices);
  
  const vertice4 = new Vertice(4, 5);
  if (poligono.addVertice(vertice4)) {
    console.log('Vértice adicionado com sucesso!');
  } else {
    console.log('Vértice já existe no polígono');
  }
  
  console.log('Perímetro do polígono:', poligono.perimetro);

  class Turma {
    constructor() {
        this.alunos = [];
    }

    inserirAluno(matricula, nome){
        if(this.alunos.some(aluno =>aluno.matricula === matricula)){
           throw new Error('Aluno já cadastrado ou possui o mesmo número de matrícula');
        } 
        const aluno = {
            matricula: matricula,
            nome: nome,
            p1: undefined,
            p2: undefined,
            nf: undefined
        };
        this.alunos.push(aluno);
    }

    removerAluno(matricula){
        const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);
        if(index === -1){
            throw new Error('Aluno não encontrado');
        }
        this.alunos.splice(index, 1);
    }

    lancarNota(matricula, p1, p2){
        const aluno = this.alunos.find(aluno => aluno.matricula === matricula);
        if(!aluno){
            throw new Error('Aluno não encontrado');
        }
        aluno.p1 = p1;
        aluno.p2 = p2;
        if (aluno.p1 !== undefined && aluno.p2 !== undefined){
            aluno.nf = (aluno.p1 + aluno.p2) / 2;
        }else if (aluno.p1 !== undefined){
            aluno.nf = aluno.p1 / 2;
        } else if (aluno.p2 !== undefined){
            aluno.nf = aluno.p2 / 2;
        } else {
            aluno.nf = 0;
        }        
    }

    imprimirAlunos(){
    console.log('----------------------------------------------');
    console.log('Matricula Nome                P1   P2   NF');
    console.log('----------------------------------------------');
    this.alunos.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(aluno => {
      console.log(`${aluno.matricula}         ${aluno.nome.padEnd(20, ' ')} ${aluno.p1 ? aluno.p1.toFixed(1).padEnd(4, ' ') : '-   '} ${aluno.p2 ? aluno.p2.toFixed(1).padEnd(4, ' ') : '-   '} ${aluno.nf.toFixed(1)}`);
    });
    console.log('----------------------------------------------');
  }
}

const turma = new Turma();

const numAlunos = parseInt(prompt('Digite o número de alunos na turma: '));

console.log('Inserindo alunos na turma:');
for (let i = 1; i <= numAlunos; i++) {
  const matricula = prompt(`Digite a matrícula do aluno ${i}: `);
  const nome = prompt(`Digite o nome do aluno ${i}: `);
  turma.inserirAluno(matricula, nome);
}

console.log('Lançando notas das provas:');
for (let i = 1; i <= numAlunos; i++) {
  const matricula = prompt(`Digite a matrícula do aluno ${i}: `);
  const p1 = parseFloat(prompt(`Digite a nota da primeira prova do aluno ${i} (caso tenha faltado digite 0): `));
  const p2 = parseFloat(prompt(`Digite a nota da segunda prova do aluno ${i} (caso tenha faltado digite 0): `));
  turma.lancarNota(matricula, p1, p2);
}

turma.imprimirAlunos();
function validarEntrada(campoNome, entradaValor, regex, errorMessage) {
    while (!regex.test(entradaValor)){
        console.log(errorMessage);
        entradaValor = prompt(`${campoNome}: `);
    }
    return entradaValor;
}

function entradaClienteDados() {
    const nomeRegex = /^.{5,}$/;
    const cpfRegex = /^\d{11}$/;
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const rendaRegex = /^([1-9]\d*|0)(,\d{1,2})?$/;
    const estadoCivilRegex = /^[CSVD]$/i;
    const dependentesRegex = /^[0-9]{1,2}$/;

    let nome = validarEntrada('Nome', prompt('Digite seu nome: '), nomeRegex, 'O nome deve ter pelo menos 5 caracteres');
    let cpf = validarEntrada('CPF', prompt('Digite seu CPF: '), cpfRegex, 'O CPF deve ter 11 dígitos.');
    let dataNascimento = validarEntrada('Data de nascimento (DD/MM/AAAA)', prompt('Digite sua data de nascimento: '), dataRegex, 'A data deve ser no formato DD/MM/AAAA');
    let rendaMensal = validarEntrada('Renda mensal', prompt('Renda mensal: '), rendaRegex, 'A renda mensal deve ser um número válido com duas casas decimais separadas por vírgula.');
    let estadoCivil = validarEntrada('Estado civil (C, S, V ou D)', prompt('Estado civil: (C, S, V ou D): '), estadoCivilRegex, 'O estado civil deve ser C, S, V ou D.');
    let dependentes = validarEntrada('Dependentes', prompt('Dependentes: '), dependentesRegex, 'Quantidade de dependentes deve ser entre 0 e 10.');

    const dataAtual = new Date();
    const dataAniversario = new Date(dataNascimento.split('/').reverse().join('/'));

    if((dataAtual - dataAniversario)/ (1000*60*60*24*365) < 18){
        console.log('O cliente dever ter pelo menos 18 anos na data atual');
        return;
    }

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    rendaMensal = parseFloat(rendaMensal).toFixed(2);

    console.log('Dados do cliente:');
    console.log(`Nome: ${nome}`);
    console.log(`CPF: ${cpf}`);
    console.log(`Data de nascimento: ${dataNascimento}`);
    console.log(`Renda mensal: ${rendaMensal}`);
    console.log(`Estado civil: ${estadoCivil}`);
    console.log(`Dependentes: ${dependentes}`);
}

entradaClienteDados();