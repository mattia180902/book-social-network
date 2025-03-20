package com.sincon.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${application.file.upload.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(
            @NonNull MultipartFile sourceFile,
            @NonNull Integer userId) {

        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile, fileUploadSubPath);
    }

    private String uploadFile(
            @NonNull MultipartFile sourceFile,
            @NonNull String fileUploadSubPath) {

        final String finalUploadPath = fileUploadPath + File.separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create the Target folder");
            }
        }
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        //  ./upload/users/1/2323567.jpg
        String targetFilePath = finalUploadPath + File.separator + System.currentTimeMillis() + "." + fileExtension;
        Path targePath = Paths.get(targetFilePath);
        try{
            Files.write(targePath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved" , e);
        }
        return null;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return null;
        }
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return null;
        }
        // .JPG --> jpg
        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }

}
