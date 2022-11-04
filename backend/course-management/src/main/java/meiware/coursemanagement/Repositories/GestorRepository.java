package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Utilizador;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class GestorRepository implements IGestorRepository{
    @Autowired
    private IUtilizadorRepository utilizadorRepository;

    @Override
    public List<Utilizador> getGestores() {
        List<Utilizador> gestores =  new ArrayList<>();
        Iterable<Utilizador> utilizadores = utilizadorRepository.findAll();

        utilizadores.forEach(u -> {
            if(u.isGestor()) gestores.add(u);
        });

        return gestores;
    }
}
