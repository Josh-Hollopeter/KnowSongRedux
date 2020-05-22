package life.knowsong.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rank {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@Column(name = "img_source")
	private String imgSource;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getImgSource() {
		return imgSource;
	}


	public void setImgSource(String imgSource) {
		this.imgSource = imgSource;
	}


	public Rank() {
		super();
	}
	
	

}
