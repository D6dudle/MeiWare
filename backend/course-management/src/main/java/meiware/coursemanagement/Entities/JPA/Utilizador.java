package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Set;

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
    private Set<Role> roles;

    @ManyToOne(fetch = FetchType.LAZY)
    private Utilizador manager;

    @OneToMany(mappedBy = "id")
    private Set<Budget> listBudget;

    @OneToMany(mappedBy = "quemFezPedido", fetch = FetchType.EAGER)
    private Set<PedidoFormacao> listPedidos;

    @ManyToMany(mappedBy = "formandos")
    private Set<PedidoAprovado> listFormacoes;

    public Utilizador(){    }

    public Utilizador(long id) {
        this.id = id;
    }

    public Utilizador(String nome, String email, String password, Set<Role> roles){
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public Utilizador(String nome, String email, String password, Set<Role> roles, Utilizador manager){
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.manager = manager;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Utilizador getManager() {
        return manager;
    }

    public void setManager(Utilizador manager) {
        this.manager = manager;
    }

    public Set<Budget> getListBudget() {
        return listBudget;
    }

    public void setListBudget(Set<Budget> listBudget) {
        this.listBudget = listBudget;
    }

    public Set<PedidoFormacao> getListPedidos() {
        return listPedidos;
    }

    public void setListPedidos(Set<PedidoFormacao> listPedidos) {
        this.listPedidos = listPedidos;
    }

    public Set<PedidoAprovado> getListFormacoes() {
        return listFormacoes;
    }

    public void setListFormacoes(Set<PedidoAprovado> listFormacoes) {
        this.listFormacoes = listFormacoes;
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

    public JSONObject toJSON(){
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("nome", nome);
        obj.put("email", email);
        obj.put("isColaborador", isColaborador());
        obj.put("isGestor", isGestor());
        obj.put("isAdministrador", isAdministrador());
        if (manager == null)
            obj.put("managerId", -1);
        else
            obj.put("managerId", manager.getId());
        return obj;
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