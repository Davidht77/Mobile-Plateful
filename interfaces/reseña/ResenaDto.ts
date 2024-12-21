export interface ResenaDTO {
    id_resena: number; 
    contenido: string;
    calificacion: number;
    id_usuario: number;
    nombre_usuario: string;
    id_restaurante: number;
    fecha: string;
  }

export interface CreateResenaDTO {
      calificacion: number;
      contenido: string;
      id_usuario: number;
      id_restaurante: number;
}
  