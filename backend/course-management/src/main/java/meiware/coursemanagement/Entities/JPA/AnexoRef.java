package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class AnexoRef {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private String id;
    @NotNull
    private String path; // Representa o id na base de dados MongoDB

    @NotNull
    private String tipo;

    public AnexoRef() {

    }

    public AnexoRef(String path, String tipo) {
        this.path = path;
        this.tipo = tipo;
    }

    public String getId() {
        return id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "AnexoRef{" +
                "id=" + id +
                ", path='" + path + '\'' +
                '}';
    }
}