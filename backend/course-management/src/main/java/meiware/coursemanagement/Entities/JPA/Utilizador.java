package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.HashSet;
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

    @OneToMany(mappedBy = "user")
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
        this.listBudget = new HashSet<>();
    }

    public Utilizador(String nome, String email, String password, Set<Role> roles, Utilizador manager){
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.manager = manager;
        this.listBudget = new HashSet<>();
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

        JSONArray lists = new JSONArray();
        for (PedidoFormacao listaPedidos : listPedidos){
            lists.put(listaPedidos.toJSON());
        }
        obj.put("listaFormacoes", lists);

        obj.put("listBudget", listBudget);
        return obj;
    }

    public JSONObject listaFormacaoUsertoJSON(){
        JSONObject obj = new JSONObject();

        JSONArray lists = new JSONArray();
        for (PedidoFormacao listaPedidos : listPedidos){
           //Retorna um JSON Object com a formacao
            lists.put(listaFormacaoToJSON(listaPedidos));
        }
        obj.put("listaFormacoes", lists);
        return obj;
    }

    public JSONObject listaFormacaoToJSON(PedidoFormacao listaFormacao){
        JSONObject obj = new JSONObject();
        obj.put("username", listaFormacao.getQuemFezPedido().getNome());
        obj.put("nomeFormacao", listaFormacao.getNome());
        obj.put("dataFormacao", listaFormacao.getDataCriacao());
        obj.put("idCurso", listaFormacao.getId());

        obj.put("justificacaoFormacao", listaFormacao.getJustificacao());
        //PENDENTE
        //CURSO
        //REJEITADA
        //TERMINADA

        if (listaFormacao.getDiscriminatorValue().equals("PedidoFormacao") && !listaFormacao.isApagada()){
            // A formacao ainda esta pendente
            obj.put("tipoFormacao", "PENDENTE");
        }else if (listaFormacao.getDiscriminatorValue().equals("APROVADA") && !listaFormacao.isApagada()){
            if (listaFormacao instanceof PedidoAprovado){
                PedidoAprovado auxAprovado = (PedidoAprovado)listaFormacao;
                if (auxAprovado.isConcluida())
                    obj.put("tipoFormacao", "TERMINADA");
                else{
                    obj.put("tipoFormacao", "CURSO");
                }

            }
        }else if (listaFormacao.getDiscriminatorValue().equals("REJEITADA") && !listaFormacao.isApagada() ) {
            obj.put("tipoFormacao", "REJEITADA");
        }
        return obj;
    }

    public JSONObject toJSONAuth(){
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