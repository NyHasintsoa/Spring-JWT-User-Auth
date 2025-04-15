package com.group.exercise.project.service.message;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.group.exercise.project.entity.Message;
import com.group.exercise.project.entity.User;
import com.group.exercise.project.repository.MessageRepository;
import com.group.exercise.project.request.WriteMessageRequest;
import com.group.exercise.project.service.user.UserService;
import com.group.exercise.project.util.GenerateId;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

@Service
public class MessageService implements IMessageService {

    @Value("${entity.id.max.length}")
    private Integer MAX_LENGTH_ID;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Message> getConversationsFromToId(String fromId, String toId) {
        CriteriaBuilder cBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Message> query = cBuilder.createQuery(Message.class);
        Root<Message> message = query.from(Message.class);
        Join<Message, User> fromUser = message.join("fromId");
        Join<Message, User> toUser = message.join("toId");
        query.select(message)
                .where(
                        cBuilder.or(
                                cBuilder.and(
                                        cBuilder.equal(fromUser.get("id"), fromId),
                                        cBuilder.equal(toUser.get("id"), toId)),
                                cBuilder.and(
                                        cBuilder.equal(fromUser.get("id"), toId),
                                        cBuilder.equal(toUser.get("id"), fromId))));
        query.orderBy(cBuilder.asc(message.get("createdAt")));
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Message writeMessageFromIdToId(String toId, WriteMessageRequest request) {
        User toUser = userService.getUserById(toId);
        User fromUser = userService.getUserById(request.getFromId());
        Message message = new Message();
        message.setId(GenerateId.generateConstanteLengthId(request.getContent()));
        message.setContent(request.getContent());
        message.setFromId(fromUser);
        message.setToId(toUser);
        return messageRepository.save(message);
    }

}
