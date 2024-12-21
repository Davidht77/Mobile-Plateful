export interface ComentarioDTO {
    id_comentario: number;
    id_resena: number;
    id_usuario: number;
    nombre_usuario: string;
    contenido: string;
    fecha: string;
  }

export interface CreateComentarioDTO {
      contenido: string;
      id_resena: number;
      id_usuario: number;
}