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

@Service
public class MessageService implements IMessageService {

    @Value("${entity.id.max.length}")
    private Integer MAX_LENGTH_ID;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<Message> getConversationsFromToId(String fromId, String toId) {
        return messageRepository.findAllByFromIdIdAndToIdId(fromId, toId);
    }

    @Override
    public Message writeMessageFromIdToId(User fromId, String toId, WriteMessageRequest request) {
        User toUser = userService.getUserById(toId);
        Message message = new Message();
        message.setId(GenerateId.generateConstanteLengthId(request.getContent(), MAX_LENGTH_ID));
        message.setContent(request.getContent());
        message.setFromId(fromId);
        message.setToId(toUser);
        return messageRepository.save(message);
    }

}
