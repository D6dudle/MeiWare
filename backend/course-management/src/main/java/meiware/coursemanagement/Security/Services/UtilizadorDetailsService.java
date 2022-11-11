package meiware.coursemanagement.Security.Services;

import meiware.coursemanagement.JPA.Utilizador;
import meiware.coursemanagement.Repositories.IUtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UtilizadorDetailsService implements UserDetailsService {
    @Autowired
    IUtilizadorRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            Utilizador user = userRepository.findByEmail(email);
            return UtilizadorDetails.build(user);
        }catch (EmptyResultDataAccessException notFound){
            throw new UsernameNotFoundException("User Not Found with email: " + email);
        }
    }
}
