package meiware.coursemanagement.Services;

import meiware.coursemanagement.JPA.Anexo;
import meiware.coursemanagement.Repositories.IAnexoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnexoService implements IAnexoService{

    @Autowired
    private IAnexoRepository anexoRepository;
    // TODO: exception handling

    @Override
    public List<Anexo> getAnexos() {
        List<Anexo> anexos = new ArrayList<>();
        for (Anexo a: anexoRepository.findAll()) {
            anexos.add(a);
        }

        return anexos;
    }

    @Override
    public Anexo getAnexoById(Long id) {
        return anexoRepository.findById(id).orElse(null);
    }

    @Override
    public Anexo createAnexo(Anexo newAnexo) {
        return anexoRepository.save(newAnexo);
    }

    @Override
    public void updateAnexo(Anexo updatedAnexo) {
        anexoRepository.save(updatedAnexo);
    }

    @Override
    public void removeAnexo(Anexo anexo) {
        anexoRepository.delete(anexo);
    }
}
