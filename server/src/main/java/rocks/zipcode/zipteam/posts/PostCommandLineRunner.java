package rocks.zipcode.zipteam.posts;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class PostCommandLineRunner implements CommandLineRunner {

    private final PostRepository repository;

    public PostCommandLineRunner(PostRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Hello World!", "Anyone there?", "I'll come back when there is someone here.",
        "With listening comes wisdom, with speaking repentance.",
        "I'm sorry, but my karma just ran over your dogma.",
        "No person is an island, but some of us are long peninsulas.").forEach(name ->
                repository.save(new Post(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}