package dao;

import java.util.ArrayList;
import java.util.List;
import model.Estudiante;

/**
 * Clase DAO para gestionar la lista de estudiantes.
 */
public class EstudianteDAO {
    private List<Estudiante> estudiantes = new ArrayList<>();

    /**
     * Agrega un estudiante a la lista.
     * @param e Estudiante a agregar
     */
    public void agregar(Estudiante e) {
        estudiantes.add(e);
    }

    /**
     * Retorna la lista de todos los estudiantes.
     * @return Lista de estudiantes
     */
    public List<Estudiante> listar() {
        return estudiantes;
    }

    /**
     * Busca un estudiante por su ID.
     * @param id Identificador del estudiante
     * @return Estudiante encontrado o null si no existe
     */
    public Estudiante buscarPorId(int id) {
        for (Estudiante e : estudiantes) {
            if (e.getId() == id) {
                return e;
            }
        }
        return null;
    }

    /**
     * Edita los datos de un estudiante existente.
     * @param id Identificador del estudiante a editar
     * @param apellidos Nuevos apellidos
     * @param nombres Nuevos nombres
     * @param edad Nueva edad
     * @return true si se editó, false si no se encontró
     */
    public boolean editar(int id, String apellidos, String nombres, int edad) {
        Estudiante e = buscarPorId(id);
        if (e != null) {
            e.setApellidos(apellidos);
            e.setNombres(nombres);
            e.setEdad(edad);
            return true;
        }
        return false;
    }

    /**
     * Elimina un estudiante por su ID.
     * @param id Identificador del estudiante a eliminar
     * @return true si se eliminó, false si no se encontró
     */
    public boolean eliminar(int id) {
        Estudiante e = buscarPorId(id);
        if (e != null) {
            estudiantes.remove(e);
            return true;
        }
        return false;
    }
}
