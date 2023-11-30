package com.opinions.service;

import com.opinions.dto.*;
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

    public List<StreamingDto> getTrendingAll(String type) {
        if (type.equals("movie")) {
            return streamingListFormat(repository.getTrendingMovies());
        } else if (type.equals("tv")) {
            return streamingListFormat(repository.getTrendingTvSeries());
        } else {
            return streamingListFormat(repository.getTrendingAll());
        }
    }

    public MovieDto getMovie(Integer movie) {
        MovieDto result = modelMapper.map(repository.getMovie(movie), MovieDto.class);
        result.setTrailer(getTrailerLink(movie, true));
        result.setCast(getCast(movie, true));
        return result;
    }

    public SeriesDto getTvSerie(Integer serie) {
        SeriesDto result = modelMapper.map(repository.getTvSerie(serie), SeriesDto.class);;
        result.setTrailer(getTrailerLink(serie, false));
        result.setCast(getCast(serie, false));
        return result;
    }

    public List<CastDto> getCast (Integer id, boolean movie) {
        TmdbCastResult castDto = modelMapper.map(repository.getCast(id, movie), TmdbCastResult.class);
        return castDto.getCast();
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

    public List<StreamingDto> searchMulti(String query) {
        List<StreamingTempDto> temp = repository.searchMulti(query);
        return streamingListFormat(temp);
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
            } else if (streaming.getMedia_type().equals("person")) {
                continue;
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
