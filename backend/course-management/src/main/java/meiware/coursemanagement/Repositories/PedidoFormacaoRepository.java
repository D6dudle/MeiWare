package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.PedidoFormacao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class PedidoFormacaoRepository implements IPedidoFormacaoRepository{
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<PedidoFormacao> findAll() {
        return em.createNativeQuery("SELECT * FROM PedidoFormacao pf WHERE pf.apagada == false").getResultList();
    }

    @Override
    public PedidoFormacao findById(Long id) {
        return em.find(PedidoFormacao.class, id);
    }

    @Override
    public PedidoFormacao save(PedidoFormacao pf) {
        em.persist(pf);
        return pf;
    }

    @Override
    public void delete(PedidoFormacao pf) {
        em.remove(pf);
    }
}
