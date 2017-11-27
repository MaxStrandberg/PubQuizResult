package com.result.PubQuizResults.domain;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Result {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	private String place;
	private String date;
	private int points;
	private int placement;
	
	public Result(){
		
	}
	
	
	
	public Result(String place, String date, int points, int placement) {
		super();
		
		this.place = place;
		this.date = date;
		this.points = points;
		this.placement = placement;
	}



	public String getPlace() {
		return place;
	}



	public void setPlace(String place) {
		this.place = place;
	}



	public String getDate() {
		return date;
	}



	public void setDate(String date) {
		this.date = date;
	}



	public int getPoints() {
		return points;
	}



	public void setPoints(int points) {
		this.points = points;
	}



	public int getPlacement() {
		return placement;
	}



	public void setPlacement(int placement) {
		this.placement = placement;
	}



	@Override
	public String toString() {
		return "Results [place=" + place + ", date=" + date + ", points=" + points + ", placement=" + placement + "]";
	}



	
	
	

}