package com.appintern.demo.service;

import com.appintern.demo.domain.Post;
import com.appintern.demo.domain.User;
import com.appintern.demo.dto.PostRequest;
import com.appintern.demo.dto.PostResponse;
import com.appintern.demo.repo.PostRepository;
import com.appintern.demo.repo.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepo;
    private final UserRepository userRepo;

    public PostService(PostRepository postRepo, UserRepository userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    // lấy user đang đăng nhập từ SecurityContext
    private User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No auth");
        }
        String username = auth.getPrincipal().toString();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    public PostResponse create(PostRequest req) {
        User author = currentUser();
        Post p = Post.builder()
                .title(req.title())
                .content(req.content())
                .author(author)
                .build();
        p = postRepo.save(p);
        return toDto(p);
    }

    public List<PostResponse> list() {
        return postRepo.findAll().stream().map(this::toDto).toList();
    }

    public PostResponse get(Long id) {
        Post p = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
        return toDto(p);
    }

    public PostResponse update(Long id, PostRequest req) {
        User me = currentUser();
        Post p = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        if (!p.getAuthor().getId().equals(me.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit others' post");
        }
        p.setTitle(req.title());
        p.setContent(req.content());
        p = postRepo.save(p);
        return toDto(p);
    }

    public void delete(Long id) {
        User me = currentUser();
        Post p = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        if (!p.getAuthor().getId().equals(me.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete others' post");
        }
        postRepo.delete(p);
    }

    private PostResponse toDto(Post p) {
        return new PostResponse(
                p.getId(),
                p.getTitle(),
                p.getContent(),
                p.getAuthor().getUsername(),
                p.getCreatedAt(),
                p.getUpdatedAt()
        );
    }
}
