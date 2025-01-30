package com.group.exercise.project.service.contact;

import com.group.exercise.project.request.ContactRequest;

public interface IContactService {

    void sendMailMessage(ContactRequest request);

}
