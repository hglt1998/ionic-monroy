export class Horario {
    id: number;
    dia: number;
    hora: number;
    aula: string;
    curso: string;
    materia: string;
    profesor: string;
    nombreProfesor: string;
    key: string;

    _compare(h1: Horario, h2: Horario){
        var iguales = false;
        if (h1.key == h2.key){
            iguales = true;
        }
        return iguales;
    }
}