package com.opinions.service;

import com.opinions.dto.*;
import com.opinions.repository.DiscoverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DiscoverService {

    @Autowired
    private DiscoverRepository repository;

    ModelMapper modelMapper = new ModelMapper();

    public List<StreamingDto> getMovies(DiscoverDto filters) {
        return streamingListFormat(repository.getMovies(filters.getFilters(), filters.getPage()), false);
    }

    public List<StreamingDto> getTvSeries(DiscoverDto filters) {
        return streamingListFormat(repository.getTvSeries(filters.getFilters(), filters.getPage()), true);
    }

    public List<StreamingDto> streamingListFormat (List<StreamingTempDto> data, Boolean tvSeries) {
        List<StreamingDto> result = new ArrayList<StreamingDto>();
        for(StreamingTempDto streaming: data) {
            if (tvSeries) {
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
