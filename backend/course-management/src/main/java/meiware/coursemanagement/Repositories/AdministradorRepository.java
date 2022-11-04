package meiware.coursemanagement.Repositories;

import meiware.coursemanagement.JPA.Utilizador;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class AdministradorRepository implements IAdministradorRepository{
    @Autowired
    private IUtilizadorRepository utilizadorRepository;

    @Override
    public List<Utilizador> getAdministradores() {
        List<Utilizador> administradores =  new ArrayList<>();
        Iterable<Utilizador> utilizadores = utilizadorRepository.findAll();

        utilizadores.forEach(u -> {
            if(u.isAdministrador()) administradores.add(u);
        });

        return administradores;
    }
}
