package com.opinions.service;

import com.opinions.dto.MovieDto;
import com.opinions.dto.SeriesDto;
import com.opinions.dto.StreamingDto;
import com.opinions.dto.StreamingTempDto;
import com.opinions.dto.TmdbTrailerResult;
import com.opinions.dto.TrailerDto;
import com.opinions.repository.StreamingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StreamingService {

    @Autowired
    private StreamingRepository repository;

    ModelMapper modelMapper = new ModelMapper();

    public List<StreamingDto> getTrendingAll() {
        return streamingListFormat(repository.getTrendingAll());
    }

    public MovieDto getMovie(Integer movie) {
        MovieDto result = modelMapper.map(repository.getMovie(movie), MovieDto.class);
        result.setTrailer(getTrailerLink(movie, true));
        return result;
    }

    public SeriesDto getTvSerie(Integer serie) {
        SeriesDto result = modelMapper.map(repository.getTvSerie(serie), SeriesDto.class);;
        result.setTrailer(getTrailerLink(serie, false));
        return result;
    }

    public String getTrailerLink (Integer id, Boolean movie) {
        TmdbTrailerResult trailerDto = modelMapper.map(repository.getTrailer(id, movie), TmdbTrailerResult.class);
        for (TrailerDto result: trailerDto.getResults()) {
            if (result.getType().equals("Trailer")) {
                return ("https://www.youtube.com/embed/" + result.getKey() + "?autoplay=1&hl=pt&modestbranding=1&fs=1&autohide=1");
            }
        }
        return null;
    }

    public List<MovieDto> searchMovies(String movie) {
        return repository.searchMovies(movie);
    }

    public StreamingDto streamingFormat (StreamingTempDto data) {
        if (data.getMedia_type().equals("tv")) {
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
