package model;
/**
 * Clase que representa a un Estudiante.
 * Contiene atributos básicos y métodos de acceso.
 */
public class Estudiante {
    private int id;
    private String apellidos;
    private String nombres;
    private int edad;

    /**
     * Constructor de Estudiante.
     * @param id Identificador único
     * @param apellidos Apellidos del estudiante
     * @param nombres Nombres del estudiante
     * @param edad Edad del estudiante
     */
    public Estudiante(int id, String apellidos, String nombres, int edad) {
        this.id = id;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.edad = edad;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }
    
}

