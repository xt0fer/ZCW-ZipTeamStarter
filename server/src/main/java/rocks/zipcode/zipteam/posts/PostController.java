package rocks.zipcode.zipteam.posts;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class PostController {
    private PostRepository repository;

    public PostController(PostRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/anonymousposts")
    @CrossOrigin(origins = {"http://localhost:8100","http://localhost:8080"})
    public Collection<Post> goodPosts() {

        return repository.findAll().stream()
                .filter(this::isAnonymous)
                .collect(Collectors.toList());
    }

    private boolean isAnonymous(Post Post) {
        return Post.getUserid().equals("Anonymous Coward");
    }
    @GetMapping("/posts")
    @CrossOrigin(origins = {"http://localhost:8100","http://localhost:8080"})
    public Collection<Post> allPosts() {

        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

}