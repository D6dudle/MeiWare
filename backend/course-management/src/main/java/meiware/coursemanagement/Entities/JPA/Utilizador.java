package meiware.coursemanagement.Entities.JPA;

import com.sun.istack.NotNull;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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

    @ManyToMany(mappedBy = "formandos", cascade = CascadeType.ALL)
    private Set<PedidoFormacao> listFormacoes;


    private Boolean apagado = false;

    public Utilizador(){    }

    public Utilizador(Long id) {
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

    public Boolean isApagado() {
        return apagado;
    }

    public void setApagado(Boolean apagado) {
        this.apagado = apagado;
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

    public Set<PedidoFormacao> getListFormacoes() {
        return listFormacoes;
    }

    public void setListFormacoes(Set<PedidoFormacao> listFormacoes) {
        this.listFormacoes = listFormacoes;
    }

    public void addFormacao(PedidoFormacao pedidoAprovado){
        if(this.listFormacoes == null)
            this.listFormacoes = new HashSet<>();
        this.listFormacoes.add(pedidoAprovado);
    }

    public void remFormacao(PedidoFormacao pedidoAprovado){
        if(this.listFormacoes == null)
            this.listFormacoes = new HashSet<>();
        this.listFormacoes.remove(pedidoAprovado);
    }

    public Boolean isAdministrador() {
        return roles.contains(Role.ADMINISTRADOR);
    }

    public Boolean isGestor() {
        return roles.contains(Role.GESTOR);
    }

    public Boolean isColaborador() {
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
        obj.put("isApagado", apagado);

        if (manager == null)
            obj.put("managerId", -1);
        else
            obj.put("managerId", manager.getId());


        //System.out.println("Lista de Pedidos: " + listPedidos.size());

        JSONArray lists = new JSONArray();
        for (PedidoFormacao listaPedidos : listFormacoes) {
            lists.put(listaPedidos.toJSON());
        }
        obj.put("listaFormacoes", lists);

        lists = new JSONArray();
        for (PedidoFormacao listaPedidos1 : listPedidos){
            lists.put(listaPedidos1.toJSON());
        }
        obj.put("listaPedidos", lists);


        //System.out.println("Formacoes: " + listaFormacaoUsertoJSON());
        obj.put("listaFormacoesHandled", listaFormacaoUsertoJSON(id));

        JSONArray listsBudget = new JSONArray();
        for (Budget listaBudget : listBudget){
            listsBudget.put(listaBudget.toJSON());
        }
        obj.put("listBudget", listsBudget);

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

        System.out.println(obj);
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

    public JSONObject colaboradorToJSON(){
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("label", nome);
        obj.put("value", nome);

        return obj;
    }

    public JSONObject listaFormacaoUsertoJSON(Long userID){
        JSONObject obj = new JSONObject();

        JSONArray lists = new JSONArray();
        for (PedidoFormacao listaPedidos : listFormacoes){
           //Retorna um JSON Object com a formacao
            lists.put(listaFormacaoToJSON(listaPedidos, userID));
        }
        obj.put("listaFormacoes", lists);

        lists = new JSONArray();
        for (PedidoFormacao listaPedidos : listPedidos){
            //Retorna um JSON Object com a formacao
            lists.put(listaFormacaoToJSON(listaPedidos, userID));
        }
        obj.put("listaPedidos", lists);
        return obj;
    }

    public JSONObject listaFormacaoToJSON(PedidoFormacao listaFormacao, Long userID){
        JSONObject obj = new JSONObject();
        obj.put("id", listaFormacao.getId());
        for (Utilizador u : listaFormacao.getFormandos()){
            //Correspondem às pessoas que vão fazer a formacao
            if (u.getId() == userID)
                obj.put("username", u.getNome());
        }

        //obj.put("username", listaFormacao.getQuemFezPedido().getNome());
        obj.put("nomeFormacao", listaFormacao.getNome());
        obj.put("dataFormacao", listaFormacao.getDataCriacao());
        obj.put("idCurso", listaFormacao.getId());
        obj.put("preco", listaFormacao.getPreco());

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
}