package com.opinions.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreatedByDto {
    private Long id;
    private String name;
    private String profile_path;
    private Long gender;
    private String credit_id;
}
