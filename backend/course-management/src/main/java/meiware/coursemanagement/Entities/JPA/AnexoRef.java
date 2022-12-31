package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class AnexoRef {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull
    private String path; // Representa o id na base de dados MongoDB

    @NotNull
    private String nome;

    public AnexoRef() {

    }

    public AnexoRef(String path, String nome) {
        this.path = path;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnexoRef anexoRef = (AnexoRef) o;
        return id.equals(anexoRef.id) && path.equals(anexoRef.path) && nome.equals(anexoRef.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, path, nome);
    }

    @Override
    public String toString() {
        return "AnexoRef{" +
                "id=" + id +
                ", path='" + path + '\'' +
                '}';
    }
}