package ui;

import controller.EstudianteController;
import model.Estudiante;
import java.util.Scanner;

/**
 * Clase principal que actúa como la vista del sistema.
 * Permite al usuario interactuar con el sistema de gestión de estudiantes
 * a través de un menú en consola, utilizando el controlador para realizar
 * operaciones CRUD sobre los estudiantes.
 */
public class Main {
    /**
     * Método principal que ejecuta el menú interactivo para gestionar estudiantes.
     * @param args argumentos de línea de comandos (no utilizados)
     */
    public static void main(String[] args) {
        EstudianteController controller = new EstudianteController();
        Scanner scanner = new Scanner(System.in);
        int opcion;

        // Bucle principal del menú
        do {
            System.out.println("\n--- Menú de Estudiantes ---");
            System.out.println("1. Agregar estudiante");
            System.out.println("2. Listar estudiantes");
            System.out.println("3. Editar estudiante");
            System.out.println("4. Eliminar estudiante");
            System.out.println("5. Buscar estudiante por ID");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opción: ");
            opcion = scanner.nextInt();
            scanner.nextLine(); // Limpiar buffer

            switch (opcion) {
                case 1:
                    // Agregar un nuevo estudiante con validaciones
                    try {
                        int id;
                        while (true) {
                            System.out.print("ID: ");
                            if (!scanner.hasNextInt()) {
                                System.out.println("El ID debe ser un número entero.");
                                scanner.next();
                                continue;
                            }
                            id = scanner.nextInt();
                            scanner.nextLine();
                            if (controller.buscarEstudiante(id) != null) {
                                System.out.println("Ya existe un estudiante con ese ID.");
                            } else {
                                break;
                            }
                        }
                        String apellidos;
                        do {
                            System.out.print("Apellidos: ");
                            apellidos = scanner.nextLine().trim();
                            if (apellidos.isEmpty()) {
                                System.out.println("Los apellidos no pueden estar vacíos.");
                            }
                        } while (apellidos.isEmpty());

                        String nombres;
                        do {
                            System.out.print("Nombres: ");
                            nombres = scanner.nextLine().trim();
                            if (nombres.isEmpty()) {
                                System.out.println("Los nombres no pueden estar vacíos.");
                            }
                        } while (nombres.isEmpty());

                        int edad;
                        while (true) {
                            System.out.print("Edad: ");
                            if (!scanner.hasNextInt()) {
                                System.out.println("La edad debe ser un número entero.");
                                scanner.next();
                                continue;
                            }
                            edad = scanner.nextInt();
                            scanner.nextLine();
                            if (edad < 0) {
                                System.out.println("La edad no puede ser negativa.");
                            } else {
                                break;
                            }
                        }
                        controller.crearEstudiante(id, apellidos, nombres, edad);
                        System.out.println("Estudiante agregado.");
                    } catch (IllegalArgumentException ex) {
                        System.out.println("Error: " + ex.getMessage());
                    } catch (Exception ex) {
                        System.out.println("Error inesperado: " + ex.getMessage());
                    }
                    break;
                case 2:
                    // Listar todos los estudiantes en formato de tabla
                    System.out.println("\nListado de Estudiantes:");
                    System.out.println("-------------------------------------------------------------");
                    System.out.printf("| %-5s | %-20s | %-20s | %-4s |\n", "ID", "Apellidos", "Nombres", "Edad");
                    System.out.println("-------------------------------------------------------------");
                    if (controller.obtenerTodos().isEmpty()) {
                        System.out.printf("| %-61s |\n", "No hay estudiantes registrados.");
                    } else {
                        for (Estudiante e : controller.obtenerTodos()) {
                            System.out.printf("| %-5d | %-20s | %-20s | %-4d |\n",
                                    e.getId(),
                                    e.getApellidos(),
                                    e.getNombres(),
                                    e.getEdad());
                        }
                    }
                    System.out.println("-------------------------------------------------------------");
                    break;
                case 3:
                    // Editar un estudiante existente con validaciones
                    try {
                        System.out.print("ID del estudiante a editar: ");
                        if (!scanner.hasNextInt()) {
                            System.out.println("El ID debe ser un número entero.");
                            scanner.nextLine();
                            break;
                        }
                        int idEdit = scanner.nextInt();
                        scanner.nextLine();
                        Estudiante estEdit = controller.buscarEstudiante(idEdit);
                        if (estEdit == null) {
                            System.out.println("No se encontró el estudiante para editar.");
                            break;
                        }
                        String newApellidos;
                        do {
                            System.out.print("Nuevos apellidos: ");
                            newApellidos = scanner.nextLine().trim();
                            if (newApellidos.isEmpty()) {
                                System.out.println("Los apellidos no pueden estar vacíos.");
                            }
                        } while (newApellidos.isEmpty());

                        String newNombres;
                        do {
                            System.out.print("Nuevos nombres: ");
                            newNombres = scanner.nextLine().trim();
                            if (newNombres.isEmpty()) {
                                System.out.println("Los nombres no pueden estar vacíos.");
                            }
                        } while (newNombres.isEmpty());

                        int newEdad;
                        while (true) {
                            System.out.print("Nueva edad: ");
                            if (!scanner.hasNextInt()) {
                                System.out.println("La edad debe ser un número entero.");
                                scanner.next();
                                continue;
                            }
                            newEdad = scanner.nextInt();
                            scanner.nextLine();
                            if (newEdad < 0) {
                                System.out.println("La edad no puede ser negativa.");
                            } else {
                                break;
                            }
                        }
                        boolean editado = controller.editarEstudiante(idEdit, newApellidos, newNombres, newEdad);
                        if (editado) {
                            System.out.println("Estudiante editado correctamente.");
                        } else {
                            System.out.println("No se pudo editar el estudiante.");
                        }
                    } catch (IllegalArgumentException ex) {
                        System.out.println("Error: " + ex.getMessage());
                    } catch (Exception ex) {
                        System.out.println("Error inesperado: " + ex.getMessage());
                    }
                    break;
                case 4:
                    // Eliminar un estudiante por ID con validación
                    try {
                        System.out.print("ID del estudiante a eliminar: ");
                        if (!scanner.hasNextInt()) {
                            System.out.println("El ID debe ser un número entero.");
                            scanner.nextLine();
                            break;
                        }
                        int idDel = scanner.nextInt();
                        scanner.nextLine();
                        boolean eliminado = controller.eliminarEstudiante(idDel);
                        if (eliminado) {
                            System.out.println("Estudiante eliminado correctamente.");
                        } else {
                            System.out.println("No se encontró el estudiante para eliminar.");
                        }
                    } catch (Exception ex) {
                        System.out.println("Error inesperado: " + ex.getMessage());
                    }
                    break;
                case 5:
                    // Buscar estudiante por ID
                    try {
                        System.out.print("ID del estudiante a buscar: ");
                        if (!scanner.hasNextInt()) {
                            System.out.println("El ID debe ser un número entero.");
                            scanner.nextLine();
                            break;
                        }
                        int idBuscado = scanner.nextInt();
                        scanner.nextLine();
                        Estudiante estudiante = controller.buscarEstudiante(idBuscado);
                        if (estudiante != null) {
                            System.out.println("\nEstudiante encontrado:");
                            System.out.println("ID: " + estudiante.getId());
                            System.out.println("Apellidos: " + estudiante.getApellidos());
                            System.out.println("Nombres: " + estudiante.getNombres());
                            System.out.println("Edad: " + estudiante.getEdad());
                        } else {
                            System.out.println("No se encontró un estudiante con ese ID.");
                        }
                    } catch (Exception ex) {
                        System.out.println("Error inesperado: " + ex.getMessage());
                    }
                    break;
                case 0:
                    // Salir del programa
                    System.out.println("Saliendo...");
                    break;
                default:
                    System.out.println("Opción inválida.");
            }
        } while (opcion != 0);

        scanner.close();
    }
}
