package controller;
import model.Estudiante;
import java.util.List;
import dao.EstudianteDAO;

/**
 * Controlador para gestionar operaciones sobre estudiantes.
 */
public class EstudianteController {
    private EstudianteDAO dao = new EstudianteDAO();

    /**
     * Crea y agrega un nuevo estudiante, validando los datos.
     * @throws IllegalArgumentException si los datos no son válidos
     */
    public void crearEstudiante(int id, String apellidos, String nombres, int edad) {
        if (buscarEstudiante(id) != null) {
            throw new IllegalArgumentException("Ya existe un estudiante con ese ID.");
        }
        if (apellidos == null || apellidos.trim().isEmpty()) {
            throw new IllegalArgumentException("Los apellidos no pueden estar vacíos.");
        }
        if (nombres == null || nombres.trim().isEmpty()) {
            throw new IllegalArgumentException("Los nombres no pueden estar vacíos.");
        }
        if (edad <= 0) {
            throw new IllegalArgumentException("La edad no puede ser negativa o cero.");
        }
        Estudiante e = new Estudiante(id, apellidos.trim(), nombres.trim(), edad);
        dao.agregar(e);
    }

    /**
     * Obtiene la lista de todos los estudiantes.
     */
    public List<Estudiante> obtenerTodos() {
        return dao.listar();
    }

    /**
     * Busca un estudiante por su ID.
     */
    public Estudiante buscarEstudiante(int id) {
        return dao.buscarPorId(id);
    }

    /**
     * Edita un estudiante existente, validando los datos.
     * @return true si se editó correctamente, false si no existe el estudiante
     * @throws IllegalArgumentException si los datos no son válidos
     */
    public boolean editarEstudiante(int id, String apellidos, String nombres, int edad) {
        if (apellidos == null || apellidos.trim().isEmpty()) {
            throw new IllegalArgumentException("Los apellidos no pueden estar vacíos.");
        }
        if (nombres == null || nombres.trim().isEmpty()) {
            throw new IllegalArgumentException("Los nombres no pueden estar vacíos.");
        }
        if (edad < 0) {
            throw new IllegalArgumentException("La edad no puede ser negativa.");
        }
        return dao.editar(id, apellidos.trim(), nombres.trim(), edad);
    }

    /**
     * Elimina un estudiante por su ID.
     */
    public boolean eliminarEstudiante(int id) {
        return dao.eliminar(id);
    }
}
