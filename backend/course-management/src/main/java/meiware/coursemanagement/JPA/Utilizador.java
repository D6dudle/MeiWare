package meiware.coursemanagement.JPA;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Utilizador {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    private String nome;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    private String password;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "role", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "Role")
    @JoinColumn(name = "Utilizador_id")
    private List<Role> roles;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private Utilizador manager;

    @OneToMany(mappedBy = "id")
    private List<Budget> listBudget;

    @OneToMany(mappedBy = "id")
    private List<PedidoFormacao> listFormacoes;

    public Utilizador(){    }

    public Utilizador(String nome, String email, String password){
        this.nome = nome;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Utilizador getManager() {
        return manager;
    }

    public void setManager(Utilizador manager) {
        this.manager = manager;
    }

    public List<Budget> getListBudget() {
        return listBudget;
    }

    public void setListBudget(List<Budget> listBudget) {
        this.listBudget = listBudget;
    }

    public boolean isAdministrador() {
        return roles.contains(Role.ADMINISTRADOR);
    }

    public boolean isGestor() {
        return roles.contains(Role.GESTOR);
    }

    public boolean isColaborador() {
        return roles.contains(Role.COLABORADOR);
    }

    @Override
    public String toString() {
        return "Utilizador{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", manager=" + manager +
                '}';
    }
}