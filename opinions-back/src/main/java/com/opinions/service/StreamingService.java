package com.opinions.service;

import com.opinions.dto.StreamingDto;
import com.opinions.repository.StreamingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;

import com.opinions.dto.StreamingTempDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StreamingService {

    @Autowired
    private StreamingRepository repository;

    ModelMapper modelMapper = new ModelMapper();

    public List<StreamingDto> getTrendingAll() {
        return streamingListFormat(repository.getTrendingAll());
    }

    public StreamingDto getMovie(Integer movie) {
        return modelMapper.map(repository.getMovie(movie), StreamingDto.class);
    }

    public List<StreamingDto> searchMovies(String movie) {
        return repository.searchMovies(movie).stream()
                .map(streaming -> modelMapper.map(streaming, StreamingDto.class))
                .collect(Collectors.toList());
    }

    public StreamingDto streamingFormat (StreamingTempDto data) {
        if (data.getMedia_type().equals("TV")) {
            streamingSeriesToMovie(data);
        }
        return modelMapper.map(data, StreamingDto.class);
    }

    public List<StreamingDto> streamingListFormat (List<StreamingTempDto> data) {
        List<StreamingDto> result = new ArrayList<StreamingDto>();
        for(StreamingTempDto streaming: data) {
            if (streaming.getMedia_type().equals("tv")) {
                streamingSeriesToMovie(streaming);
            }
            result.add(modelMapper.map(streaming, StreamingDto.class));
        }
        return result;
    }

    public StreamingTempDto streamingSeriesToMovie(StreamingTempDto data) {
        data.setTitle(data.getName());
        data.setRelease_date(data.getFirst_air_date());
        return data;
    }

}
