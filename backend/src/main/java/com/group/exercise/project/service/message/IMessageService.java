package com.group.exercise.project.service.message;

import java.util.List;

import com.group.exercise.project.entity.Message;
import com.group.exercise.project.request.WriteMessageRequest;

public interface IMessageService {

    List<Message> getConversationsFromToId(String fromId, String toId);

    Message writeMessageFromIdToId(String toId, WriteMessageRequest request);

}
