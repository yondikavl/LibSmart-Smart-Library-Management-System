package com.yonquixote.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yonquixote.library.models.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
