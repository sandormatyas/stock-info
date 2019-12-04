--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users_tickers DROP CONSTRAINT IF EXISTS users_tickers_users_id_fk;
DROP INDEX IF EXISTS public.users_username_uindex;
DROP INDEX IF EXISTS public.users_tickers_id_uindex;
DROP INDEX IF EXISTS public.users_password_uindex;
DROP INDEX IF EXISTS public.users_id_uindex;
ALTER TABLE IF EXISTS ONLY public.users_tickers DROP CONSTRAINT IF EXISTS users_tickers_pk;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pk;
ALTER TABLE IF EXISTS public.users_tickers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_tickers_id_seq;
DROP TABLE IF EXISTS public.users_tickers;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    last_login timestamp without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_tickers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_tickers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    ticker character varying NOT NULL,
    name character varying NOT NULL
);


--
-- Name: users_tickers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_tickers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_tickers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_tickers_id_seq OWNED BY public.users_tickers.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_tickers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_tickers ALTER COLUMN id SET DEFAULT nextval('public.users_tickers_id_seq'::regclass);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users_tickers users_tickers_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_tickers
    ADD CONSTRAINT users_tickers_pk PRIMARY KEY (id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);


--
-- Name: users_password_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_password_uindex ON public.users USING btree (password);


--
-- Name: users_tickers_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_tickers_id_uindex ON public.users_tickers USING btree (id);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_username_uindex ON public.users USING btree (username);


--
-- Name: users_tickers users_tickers_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_tickers
    ADD CONSTRAINT users_tickers_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

